import axios from "axios";
import { Category, Product } from "./types";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10_000,
});

// Bentuk produk mentah dari DummyJSON — beda dari Product yang dipakai aplikasi.
type RawProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews?: { rating: number }[];
};

// DummyJSON membungkus daftar produk di dalam { products: [...] }.
type ProductListResponse = { products: RawProduct[] };

// Samakan respons DummyJSON ke tipe Product yang dipakai komponen.
function mapProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price,
    description: raw.description,
    category: raw.category,
    image: raw.thumbnail || raw.images?.[0] || "",
    rating: {
      // DummyJSON: rating berupa angka, tidak ada count → pakai jumlah review.
      rate: raw.rating ?? 0,
      count: raw.reviews?.length ?? 0,
    },
  };
}

export async function getProducts(limit?: number): Promise<Product[]> {
  // limit=0 → DummyJSON mengembalikan semua produk.
  const res = await api.get<ProductListResponse>("/products", {
    params: { limit: limit ?? 0 },
  });
  return res.data.products.map(mapProduct);
}

export async function getProduct(id: string | number): Promise<Product | null> {
  try {
    const res = await api.get<RawProduct>(`/products/${id}`);
    if (!res.data || !res.data.id) return null;
    return mapProduct(res.data);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  // category-list mengembalikan array string; /products/categories array objek.
  const res = await api.get<Category[]>("/products/category-list");
  return res.data;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await api.get<ProductListResponse>(
    `/products/category/${encodeURIComponent(slug)}`,
  );
  return res.data.products.map(mapProduct);
}
