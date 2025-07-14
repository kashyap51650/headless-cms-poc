import { useState } from "react";
import { PublishEvent } from "./components/PublishEvent";
import { EventsDashboard } from "./components/EventsDashboard";
import type { Event } from "./types/event";

type AppView = "dashboard" | "create-event" | "edit-event";

function App() {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setCurrentView("create-event");
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setCurrentView("edit-event");
  };

  const handleBackToDashboard = () => {
    setEditingEvent(null);
    setCurrentView("dashboard");
  };

  const handleViewEvent = (event: Event) => {
    // For now, just log the event. In the future, you could implement a detailed view
    console.log("Viewing event:", event);
  };

  return (
    <div className="App">
      {currentView === "dashboard" && (
        <EventsDashboard
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
          onViewEvent={handleViewEvent}
        />
      )}
      {(currentView === "create-event" || currentView === "edit-event") && (
        <PublishEvent
          isLoading={false}
          editingEvent={editingEvent}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
