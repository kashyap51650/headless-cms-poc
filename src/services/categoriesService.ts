import client from "../contentfulClient";
import type { EntrySkeletonType } from "contentful";
import type { Category } from "../types/event";

export interface CategoryFields {
  title: string;
  slug: string;
  color?: string;
  description?: string;
}

export interface CategorySkeleton extends EntrySkeletonType {
  contentTypeId: "category";
  fields: CategoryFields;
}

export class CategoriesService {
  /**
   * Fetch all categories from Contentful
   */
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await client.getEntries<CategorySkeleton>({
        content_type: "category", // Replace with your actual category content type ID
      });

      // Sort by name after fetching
      const categories: Category[] = response.items.map((item) => {
        // Debug: Log raw category data
        console.log("Raw category from Contentful:", item);

        return {
          id: item.sys.id,
          title: item.fields.title,
          slug: item.fields.slug,
        };
      });

      return categories.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      console.error("Error fetching categories from Contentful:", error);
      // Return fallback categories if Contentful fails
      return this.getFallbackCategories();
    }
  }

  /**
   * Fetch a single category by ID
   */
  static async getCategoryById(id: string): Promise<Category | null> {
    try {
      const entry = await client.getEntry<CategorySkeleton>(id);
      return {
        id: entry.sys.id,
        title: entry.fields.title,
        slug: entry.fields.slug,
        color: entry.fields.color,
      };
    } catch (error) {
      console.error(`Error fetching category ${id} from Contentful:`, error);
      return null;
    }
  }

  /**
   * Fetch categories by IDs
   */
  static async getCategoriesByIds(ids: string[]): Promise<Category[]> {
    try {
      const response = await client.getEntries<CategorySkeleton>({
        content_type: "category",
        "sys.id[in]": ids,
      });

      return response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        // color: item.fields.color,
      }));
    } catch (error) {
      console.error("Error fetching categories by IDs from Contentful:", error);
      return [];
    }
  }

  /**
   * Fallback categories for when Contentful is not available
   */
  private static getFallbackCategories(): Category[] {
    return [
      { id: "1", title: "Technology", slug: "technology", color: "#3B82F6" },
      { id: "2", title: "Business", slug: "business", color: "#10B981" },
      { id: "3", title: "Design", slug: "design", color: "#F59E0B" },
      { id: "4", title: "Marketing", slug: "marketing", color: "#EF4444" },
      { id: "5", title: "Startups", slug: "startups", color: "#8B5CF6" },
      { id: "6", title: "Healthcare", slug: "healthcare", color: "#06B6D4" },
      { id: "7", title: "Finance", slug: "finance", color: "#84CC16" },
      { id: "8", title: "Education", slug: "education", color: "#F97316" },
    ];
  }
}
