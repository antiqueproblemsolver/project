import { Post, User, Product } from '@/types/api';

const BASE_URL = 'https://dummyjson.com';

export class ApiService {
  static async fetchPosts(limit: number = 30, skip: number = 0): Promise<{ posts: Post[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async fetchUser(userId: number): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async fetchProducts(limit: number = 30, skip: number = 0): Promise<{ products: Product[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async searchProducts(query: string): Promise<{ products: Product[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search products');
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  static async searchPosts(query: string): Promise<{ posts: Post[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search posts');
      return await response.json();
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  static async fetchProductsByCategory(category: string): Promise<{ products: Product[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}