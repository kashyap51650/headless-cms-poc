import { createBrowserRouter } from "react-router";
import { EventsDashboard } from "./components/EventsDashboard";
import { PublishEvent } from "./components/PublishEvent";
import { Analytics } from "./components/Analytics";
import { AppLayout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <EventsDashboard />
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
    path: "/analytics",
    element: (
      <AppLayout>
        <Analytics />
      </AppLayout>
    ),
  },
]);
