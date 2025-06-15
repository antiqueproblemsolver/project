import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { ApiService } from '@/services/api';
import { Product, CartItem } from '@/types/api';

export default function StoreScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      loadProducts();
    } else {
      loadProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const loadInitialData = async () => {
    try {
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        ApiService.fetchProducts(30, 0),
        ApiService.fetchCategories()
      ]);
      setProducts(productsData.products);
      
      // Ensure categories is an array and filter to only include strings
      const validCategories = Array.isArray(categoriesData) 
        ? categoriesData.filter(category => typeof category === 'string')
        : [];
      setCategories(validCategories);
    } catch (err) {
      setError('Failed to load store data. Please try again.');
      console.error('Error loading store data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await ApiService.fetchProducts(30, 0);
      setProducts(data.products);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  const loadProductsByCategory = async (category: string) => {
    try {
      const data = await ApiService.fetchProductsByCategory(category);
      setProducts(data.products);
    } catch (err) {
      console.error('Error loading products by category:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`);
  };

  const toggleFavorite = (product: Product) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(product.id)) {
      newFavorites.delete(product.id);
    } else {
      newFavorites.add(product.id);
    }
    setFavorites(newFavorites);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatCategoryName = (category: string) => {
    // Add type check to ensure category is a string
    if (typeof category !== 'string') {
      return String(category);
    }
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Store" showMessages={false} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Store" showMessages={false} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Store" showMessages={false} />
      
      {/* Cart Badge */}
      {getCartItemCount() > 0 && (
        <TouchableOpacity style={styles.cartBadge}>
          <ShoppingCart size={20} color="#FFFFFF" strokeWidth={2} />
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{getCartItemCount()}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'all' && styles.selectedCategory]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'all' && styles.selectedCategoryText]}>
            All
          </Text>
        </TouchableOpacity>
        {categories.slice(0, 10).map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {formatCategoryName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.productsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#1877F2']}
            tintColor="#1877F2"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.productWrapper}>
            <ProductCard 
              product={product}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.has(product.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E41E3F',
    textAlign: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#1877F2',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E41E3F',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#1877F2',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    padding: 16,
  },
  productWrapper: {
    marginBottom: 8,
  },
});