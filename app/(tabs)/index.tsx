import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Plus, Users, Calendar, Video, Image as ImageIcon } from 'lucide-react-native';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import StoryBar from '@/components/StoryBar';
import CreatePostCard from '@/components/CreatePostCard';
import QuickActions from '@/components/QuickActions';
import { ApiService } from '@/services/api';
import { Post } from '@/types/api';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setError(null);
      const data = await ApiService.fetchPosts(20, 0);
      setPosts(data.posts);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleCreatePost = () => {
    console.log('Navigate to create post');
  };

  const handleLiveVideo = () => {
    console.log('Start live video');
  };

  const handleCreateEvent = () => {
    console.log('Create event');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="SocialBook" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text style={styles.loadingText}>Loading your feed...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="SocialBook" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadPosts}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="SocialBook" />
      <ScrollView
        style={styles.scrollView}
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
        {/* Stories */}
        <StoryBar />
        
        {/* Create Post */}
        <CreatePostCard onPress={handleCreatePost} />
        
        {/* Quick Actions */}
        <QuickActions 
          onLiveVideo={handleLiveVideo}
          onCreateEvent={handleCreateEvent}
        />
        
        {/* Posts */}
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
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
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  postsContainer: {
    paddingBottom: 20,
  },
});