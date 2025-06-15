import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Settings, CreditCard as Edit, MapPin, Calendar, Phone, Mail, Users, Heart, ShoppingBag } from 'lucide-react-native';
import Header from '@/components/Header';
import { ApiService } from '@/services/api';
import { User, Post } from '@/types/api';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Using user ID 1 as example profile
      const userData = await ApiService.fetchUser(1);
      setUser(userData);
      
      // Load posts from this user
      const postsData = await ApiService.fetchPosts(100, 0);
      const userSpecificPosts = postsData.posts.filter(post => post.userId === 1);
      setUserPosts(userSpecificPosts);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Profile" showMessages={false} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="Profile" showMessages={false} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" showMessages={false} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.coverPhoto}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg' }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.image }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Edit size={16} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.userEmail}>@{user.username}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#65676B" strokeWidth={2} />
              <Text style={styles.locationText}>
                {user.address.city}, {user.address.state}
              </Text>
            </View>
            
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.editProfileButton}>
                <Edit size={16} color="#1877F2" strokeWidth={2} />
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={16} color="#65676B" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>892</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
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
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'posts' ? (
          <View style={styles.postsContainer}>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <View key={post.id} style={styles.postItem}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postBody} numberOfLines={3}>{post.body}</Text>
                  <View style={styles.postStats}>
                    <View style={styles.postStat}>
                      <Heart size={14} color="#E41E3F" strokeWidth={2} />
                      <Text style={styles.postStatText}>{post.reactions.likes}</Text>
                    </View>
                    <Text style={styles.postViews}>{post.views} views</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No posts yet</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.aboutContainer}>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutSectionTitle}>Contact Information</Text>
              
              <View style={styles.aboutItem}>
                <Mail size={18} color="#1877F2" strokeWidth={2} />
                <Text style={styles.aboutText}>{user.email}</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <Phone size={18} color="#1877F2" strokeWidth={2} />
                <Text style={styles.aboutText}>{user.phone}</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <Calendar size={18} color="#1877F2" strokeWidth={2} />
                <Text style={styles.aboutText}>Born {formatDate(user.birthDate)}</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <MapPin size={18} color="#1877F2" strokeWidth={2} />
                <Text style={styles.aboutText}>
                  {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                </Text>
              </View>
            </View>
            
            <View style={styles.aboutSection}>
              <Text style={styles.aboutSectionTitle}>Personal Information</Text>
              
              <View style={styles.aboutItem}>
                <Users size={18} color="#1877F2" strokeWidth={2} />
                <Text style={styles.aboutText}>Gender: {user.gender}</Text>
              </View>
            </View>
          </View>
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
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  coverPhoto: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1877F2',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1C1E21',
    marginTop: 12,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginLeft: 4,
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F3FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1877F2',
    marginLeft: 6,
  },
  settingsButton: {
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1C1E21',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E4E6EA',
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
  postsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  postItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  postTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginLeft: 4,
  },
  postViews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  aboutContainer: {
    backgroundColor: '#FFFFFF',
  },
  aboutSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginBottom: 16,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1C1E21',
    marginLeft: 12,
    flex: 1,
  },
});