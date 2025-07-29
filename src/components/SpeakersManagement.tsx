import { Filter, Plus, Search, UserPlus, Users } from "lucide-react";
import React, { useState } from "react";
import { useDeleteSpeaker, useSpeakers } from "../hooks/useSpeakers";
import { SpeakerFormModal } from "./modals/SpeakerFormModal";
import PageHeader from "./PageHeader";
import { SpeakerCard } from "./SpeakerCard";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";

interface SpeakersManagementProps {}

export const SpeakersManagement: React.FC<SpeakersManagementProps> = () => {
  const { speakers, loading } = useSpeakers();
  const { mutate } = useDeleteSpeaker();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<any>(null);

  const filteredSpeakers = speakers.filter(
    (speaker) =>
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (speaker: any) => {
    setEditingSpeaker(speaker);
    setShowCreateModal(true);
  };

  const handleDelete = (id: string) => {
    mutate(id);
  };

  const handleCreateNew = () => {
    setEditingSpeaker(null);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingSpeaker(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title="Speakers Management"
          description=" Manage your event speakers and their information"
        >
          <Button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Speaker
          </Button>
        </PageHeader>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search speakers by name or bio..."
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

        {/* Speakers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`loading-skeleton-item-${i}`}
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
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredSpeakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpeakers.map((speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No speakers found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by adding your first speaker"}
                </p>
                <Button
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-primary-500 to-primary-600"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Speaker
                </Button>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Speaker Form Modal */}
      <SpeakerFormModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        speaker={editingSpeaker}
      />
    </div>
  );
};
