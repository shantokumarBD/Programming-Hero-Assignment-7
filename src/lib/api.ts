import { Category, Product } from "@/types";

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



// Products API


export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};


// product category 

export const getProductsByCategory = async (slug: string): Promise<Product[]> => {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
};

// single product

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/products?slug=${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) return null;
    const products = await res.json();
    

    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return null;
  }
};
