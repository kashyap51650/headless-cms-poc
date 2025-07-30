import { Filter, Plus, Search, UserCheck, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useAuthors, useDeleteAuthor } from "../hooks/useAuthors";
import { useEvents } from "../hooks/useEvents";
import { OrganizerFormModal } from "./modals/OrganizerFormModal";
import PageHeader from "./PageHeader";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { OrganizerCard } from "./OrganizerCard";

interface OrganizersManagementProps {}

export const OrganizersManagement: React.FC<OrganizersManagementProps> = () => {
  const { authors, loading, isFetching } = useAuthors();
  const { mutate } = useDeleteAuthor();
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<any>(null);

  const filteredOrganizers = authors.filter(
    (organizer) =>
      organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventsCount = (organizerId: string) => {
    return events.filter((event) => event.organizer.id === organizerId).length;
  };

  const handleEdit = (organizer: any) => {
    setEditingOrganizer(organizer);
    setShowCreateModal(true);
  };

  const handleDelete = (id: string) => {
    mutate(id);
  };

  const handleCreateNew = () => {
    setEditingOrganizer(null);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingOrganizer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title=" Organizers Management"
          description="Manage event organizers and authors"
        >
          <Button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Organizer
          </Button>
        </PageHeader>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search organizers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Organizers Grid */}
        {loading || isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`loading-organizer-item-${i}`}
                className="animate-pulse bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-slate-200 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredOrganizers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrganizers.map((organizer) => (
                  <OrganizerCard
                    key={organizer.id}
                    organizer={organizer}
                    eventsCount={getEventsCount(organizer.id)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No organizers found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by adding your first organizer"}
                </p>
                <Button
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-primary-500 to-primary-600"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Organizer
                </Button>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Organizer Form Modal */}
      <OrganizerFormModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        organizer={editingOrganizer}
      />
    </div>
  );
};
