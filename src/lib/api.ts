import axios from "axios";
import { Category, Product } from "./types";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10_000,
});

export async function getProducts(limit?: number): Promise<Product[]> {
  const res = await api.get<Product[]>("/products", {
    params: limit ? { limit } : undefined,
  });
  return res.data;
}

export async function getProduct(id: string | number): Promise<Product | null> {
  try {
    const res = await api.get<Product>(`/products/${id}`);
    if (!res.data || !res.data.id) return null;
    return res.data;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>("/products/categories");
  return res.data;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await api.get<Product[]>(
    `/products/category/${encodeURIComponent(slug)}`,
  );

  return res.data;
}
