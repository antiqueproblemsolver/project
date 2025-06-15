import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, Share, Bookmark, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { Post, User } from '@/types/api';
import { ApiService } from '@/services/api';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions.likes);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    loadUser();
  }, [post.userId]);

  const loadUser = async () => {
    try {
      const userData = await ApiService.fetchUser(post.userId);
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const formatTimeAgo = () => {
    const hours = Math.floor(Math.random() * 24) + 1;
    return `${hours}h`;
  };

  if (!user) {
    return (
      <View style={styles.loadingCard}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const shouldTruncate = post.body.length > 150;
  const displayText = shouldTruncate && !showFullText 
    ? post.body.substring(0, 150) + '...' 
    : post.body;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.postTime}>{formatTimeAgo()} ago</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#65676B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postBody}>
        {displayText}
        {shouldTruncate && (
          <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
            <Text style={styles.seeMoreText}>
              {showFullText ? ' See Less' : ' See More'}
            </Text>
          </TouchableOpacity>
        )}
      </Text>

      {/* Random post image for visual appeal */}
      {Math.random() > 0.6 && (
        <Image 
          source={{ 
            uri: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=600`
          }}
          style={styles.postImage}
        />
      )}

      {post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.slice(0, 3).map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.stats}>
        <TouchableOpacity style={styles.statsLeft}>
          <View style={styles.reactionIcons}>
            <View style={[styles.reactionIcon, { backgroundColor: '#1877F2' }]}>
              <Heart size={12} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.statsText}>{likeCount}</Text>
        </TouchableOpacity>
        <View style={styles.statsRight}>
          <Text style={styles.statsText}>{Math.floor(Math.random() * 50)} comments</Text>
          <Text style={styles.statsText}>{post.views} views</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart 
            size={20} 
            color={liked ? '#E41E3F' : '#65676B'} 
            strokeWidth={2}
            fill={liked ? '#E41E3F' : 'none'}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#65676B" strokeWidth={2} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#65676B" strokeWidth={2} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Bookmark 
            size={20} 
            color={saved ? '#1877F2' : '#65676B'} 
            strokeWidth={2}
            fill={saved ? '#1877F2' : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
  },
  postTime: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1C1E21',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeMoreText: {
    color: '#65676B',
    fontFamily: 'Inter-SemiBold',
  },
  postImage: {
    width: '100%',
    height: 250,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E7F3FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1877F2',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EA',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionIcons: {
    flexDirection: 'row',
    marginRight: 6,
  },
  reactionIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  statsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginHorizontal: 4,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
    marginLeft: 6,
  },
  likedText: {
    color: '#E41E3F',
  },
});