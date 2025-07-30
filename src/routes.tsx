import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { EventsDashboard } from "./components/EventsDashboard";
import { PublishEvent } from "./components/PublishEvent";
import { SpeakersManagement } from "./components/SpeakersManagement";
import { OrganizersManagement } from "./components/OrganizersManagement";
import { AppLayout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: "/events",
    element: (
      <AppLayout>
        <EventsDashboard />
      </AppLayout>
    ),
  },
  {
    path: "/draftEvents",
    element: (
      <AppLayout>
        <EventsDashboard />
      </AppLayout>
    ),
  },
  {
    path: "/publishedEvents",
    element: (
      <AppLayout>
        <EventsDashboard />
      </AppLayout>
    ),
  },
  {
    path: "/create-event",
    element: (
      <AppLayout>
        <PublishEvent />
      </AppLayout>
    ),
  },
  {
    path: "/edit-event/:id",
    element: (
      <AppLayout>
        <PublishEvent />
      </AppLayout>
    ),
  },
  {
    path: "/speakers",
    element: (
      <AppLayout>
        <SpeakersManagement />
      </AppLayout>
    ),
  },
  {
    path: "/organizers",
    element: (
      <AppLayout>
        <OrganizersManagement />
      </AppLayout>
    ),
  },
]);
