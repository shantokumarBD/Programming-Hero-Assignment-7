import { Category } from "@/types";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

// Categories API

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};
