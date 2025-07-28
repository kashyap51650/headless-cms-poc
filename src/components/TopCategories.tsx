import { Card } from "./ui/Card";
import { Tag } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { useEvents } from "../hooks/useEvents";

const TopCategories = () => {
  const { events } = useEvents({ published: true });
  const { categories, loading: categoriesLoading } = useCategories();
  // Get top categories by event count
  const categoryStats = categories
    .map((category) => ({
      ...category,
      eventCount: events.filter((event) =>
        event.categories.some((cat) => cat.id === category.id)
      ).length,
    }))
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 4);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Popular Categories
        </h3>
        <Tag className="w-5 h-5 text-slate-400" />
      </div>

      {categoriesLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={`category-skeleton-${i}`}
              className="animate-pulse bg-slate-200 h-12 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div>
          {categoryStats.length > 0 ? (
            <div className="space-y-3">
              {categoryStats.map((category, index) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-slate-900">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm">
                      {category.eventCount} events
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full bg-primary-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No categories yet</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default TopCategories;
