import React, { useState, useMemo } from "react";
import type { Event } from "../types/event";
import { useEvents, useDraftEvents } from "../hooks/useEvents";
import { useCategories } from "../hooks/useCategories";
import { SearchAndFilters, EventsList, Pagination } from "./dashboard";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { useLocation } from "react-router";
import { Plus } from "lucide-react";
import PageHeader from "./PageHeader";

export const EventsDashboard: React.FC = () => {
  const { pathname } = useLocation();

  const isDraftMode = pathname.split("/")[1] === "draftEvents";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const itemsPerPage = 12;

  // Use different hooks based on mode
  const publishedEventsQuery = useEvents({
    published: true,
    limit: itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage,
  });

  const draftEventsQuery = useDraftEvents();

  // Choose the appropriate data based on mode
  const { events, loading, error, total } = isDraftMode
    ? {
        events: draftEventsQuery.events,
        loading: draftEventsQuery.loading,
        error: draftEventsQuery.error,
        total: draftEventsQuery.events.length,
      }
    : publishedEventsQuery;

  const { categories, loading: loadingCategories } = useCategories();

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return events.filter((event: Event) => {
      const matchesSearch =
        !searchTerm ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        (Array.isArray(event.categories) &&
          event.categories.some((cat: any) => {
            // Handle both string and object cases
            const categoryId =
              typeof cat === "string" ? cat : cat?.id || cat?.sys?.id;
            return categoryId === selectedCategory;
          }));

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Get current page events
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Card title="Something went wrong" className="text-center">
            <div className="py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-red-600 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <PageHeader
          title={isDraftMode ? "Draft Events" : "Published Events"}
          description={
            isDraftMode
              ? "Let's Finish your draft events and publish it to make visible for every users"
              : "Here are your published events. You can edit or delete them."
          }
        />

        {/* Search and Filters Section */}
        <div className="mb-8">
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories.map((cat) => ({
              id: cat.id,
              name: cat.title,
            }))}
            isLoadingCategories={loadingCategories}
            onReset={handleResetFilters}
          />
        </div>

        {/* Events Grid Section */}
        <div className="mb-8">
          <EventsList events={currentEvents} loading={loading} />
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredEvents.length}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {(() => {
                if (searchTerm || selectedCategory) {
                  return "No events match your filters";
                }
                return isDraftMode
                  ? "No draft events found"
                  : "No events found";
              })()}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {(() => {
                if (searchTerm || selectedCategory) {
                  return "Try adjusting your search criteria or filters to find what you're looking for.";
                }
                return isDraftMode
                  ? "You don't have any draft events yet. Create your first event to get started."
                  : "You don't have any published events yet. Create your first event to get started.";
              })()}
            </p>
            {!searchTerm && !selectedCategory && (
              <Button
                onClick={() => (window.location.href = "/create-event")}
                className="inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Event
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
