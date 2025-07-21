import React, { useState, useMemo } from "react";
import type { Event } from "../types/event";
import { useEvents, useDraftEvents } from "../hooks/useEvents";
import { useCategories } from "../hooks/useCategories";
import {
  DashboardHeader,
  SearchAndFilters,
  EventsList,
  Pagination,
} from "./dashboard";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export const EventsDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDraftMode, setIsDraftMode] = useState(false);

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

  const handleModeToggle = () => {
    setIsDraftMode(!isDraftMode);
    setCurrentPage(1); // Reset to first page when switching modes
    setSearchTerm(""); // Clear search when switching modes
    setSelectedCategory(""); // Clear category filter when switching modes
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-7xl mx-auto">
          <Card title="Error" className="text-center">
            <div className="py-8">
              <p className="text-red-600 mb-4">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          total={total}
          isDraftMode={isDraftMode}
          onModeToggle={handleModeToggle}
        />

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

        <EventsList events={currentEvents} loading={loading} />

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredEvents.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};
