import client from "../contentfulClient";
import type { EntrySkeletonType } from "contentful";
import type { Category } from "../types/event";
import { categoryList } from "../data";

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
    return categoryList;
  }
}
