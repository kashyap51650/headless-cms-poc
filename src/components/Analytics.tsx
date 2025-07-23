import React from "react";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";
import { Card } from "./ui/Card";

export const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Analytics
          </h1>
          <p className="text-secondary-600">
            Track your event performance and engagement
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-secondary-900">32</p>
                <p className="text-xs text-success-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">
                  Total Attendees
                </p>
                <p className="text-2xl font-bold text-secondary-900">1,234</p>
                <p className="text-xs text-success-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">
                  Revenue
                </p>
                <p className="text-2xl font-bold text-secondary-900">$12,345</p>
                <p className="text-xs text-success-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">
                  Avg. Rating
                </p>
                <p className="text-2xl font-bold text-secondary-900">4.8</p>
                <p className="text-xs text-success-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +0.2 from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Coming Soon */}
        <Card className="p-12 text-center">
          <BarChart3 className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            Advanced Analytics Coming Soon
          </h3>
          <p className="text-secondary-600 max-w-md mx-auto">
            We're building powerful analytics tools to help you understand your
            event performance, attendee engagement, and revenue insights.
          </p>
        </Card>
      </div>
    </div>
  );
};
