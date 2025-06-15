import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import ProductCard from '@/components/ProductCard';
import { ApiService } from '@/services/api';
import { Post, Product } from '@/types/api';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'products'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim().length === 0) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      if (activeTab === 'posts') {
        const data = await ApiService.searchPosts(query);
        setPosts(data.posts);
      } else {
        const data = await ApiService.searchProducts(query);
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setPosts([]);
    setProducts([]);
    setHasSearched(false);
  };

  const addToCart = (product: Product) => {
    // This would integrate with the cart system from the store
    console.log('Added to cart:', product.title);
  };

  const toggleFavorite = (product: Product) => {
    // This would integrate with the favorites system
    console.log('Toggled favorite:', product.title);
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [query, activeTab]);

  return (
    <View style={styles.container}>
      <Header title="Search" showMessages={false} showNotifications={false} />
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#65676B" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts and products..."
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color="#65676B" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
            Products
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1877F2" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : !hasSearched ? (
          <View style={styles.emptyContainer}>
            <SearchIcon size={48} color="#65676B" strokeWidth={1} />
            <Text style={styles.emptyTitle}>Search for posts and products</Text>
            <Text style={styles.emptyText}>
              Enter keywords to find interesting posts or discover amazing products
            </Text>
          </View>
        ) : activeTab === 'posts' ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No posts found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search terms or browse different categories
              </Text>
            </View>
          )
        ) : (
          products.length > 0 ? (
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <View key={product.id} style={styles.productWrapper}>
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={false}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search terms or browse different categories
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1C1E21',
    marginLeft: 12,
  },
  clearButton: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1877F2',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
  },
  activeTabText: {
    color: '#1877F2',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    textAlign: 'center',
    lineHeight: 20,
  },
  productsGrid: {
    padding: 16,
  },
  productWrapper: {
    marginBottom: 8,
  },
});