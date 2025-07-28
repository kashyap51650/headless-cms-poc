import React from "react";
import { Link, useLocation } from "react-router";
import {
  Calendar,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  UserCheck,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const mainNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "create-event",
    label: "Create Event",
    icon: <CalendarPlus className="w-5 h-5" />,
    href: "/create-event",
  },
  {
    id: "drafts",
    label: "Draft Events",
    icon: <Calendar className="w-5 h-5" />,
    href: "/draftEvents",
  },
  {
    id: "events",
    label: "Published Events",
    icon: <Calendar className="w-5 h-5" />,
    href: "/publishedEvents",
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Users className="w-5 h-5" />,
    href: "/speakers",
  },
  {
    id: "organizers",
    label: "Organizers",
    icon: <UserCheck className="w-5 h-5" />,
    href: "/organizers",
  },
];

// NavItem Component - moved outside to avoid re-creation
const NavItemComponent: React.FC<{ item: NavItem; isCollapsed: boolean }> = ({
  item,
  isCollapsed,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  return (
    <Link
      to={item.href}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
            : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
      title={isCollapsed ? item.label : ""}
    >
      <span
        className={`
          flex-shrink-0 transition-transform duration-200
          ${isActive ? "scale-110" : "group-hover:scale-105"}
        `}
      >
        {item.icon}
      </span>

      {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden focus:outline-none"
          onClick={onToggle}
          onKeyDown={(e) => e.key === "Escape" && onToggle()}
          aria-label="Close sidebar"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-secondary-200 transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isOpen ? "w-64" : "lg:w-16"}
          lg:relative lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            {isOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-secondary-900">
                    EventMaster
                  </h1>
                </div>
              </div>
            )}

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-secondary-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-secondary-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-secondary-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <NavItemComponent
                  key={item.id}
                  item={item}
                  isCollapsed={!isOpen}
                />
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
