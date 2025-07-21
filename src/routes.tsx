import { createBrowserRouter } from "react-router";
import { EventsDashboard } from "./components/EventsDashboard";
import { PublishEvent } from "./components/PublishEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EventsDashboard />,
  },
  {
    path: "/create-event",
    element: <PublishEvent />,
  },
  {
    path: "/edit-event/:id",
    element: <PublishEvent />,
  },
]);
