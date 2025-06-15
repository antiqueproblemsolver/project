import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  isViewed: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    user: 'Your Story',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    isViewed: false,
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    isViewed: false,
  },
  {
    id: 3,
    user: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=200',
    isViewed: true,
  },
  {
    id: 4,
    user: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    isViewed: false,
  },
  {
    id: 5,
    user: 'David Brown',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=200',
    isViewed: true,
  },
];

export default function StoryBar() {
  const handleStoryPress = (story: Story) => {
    console.log('Story pressed:', story.user);
  };

  const handleCreateStory = () => {
    console.log('Create story');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Create Story */}
        <TouchableOpacity style={styles.createStory} onPress={handleCreateStory}>
          <Image 
            source={{ uri: stories[0].avatar }}
            style={styles.createStoryImage}
          />
          <View style={styles.createStoryOverlay}>
            <View style={styles.plusButton}>
              <Plus size={16} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.createStoryText}>Create Story</Text>
          </View>
        </TouchableOpacity>

        {/* Stories */}
        {stories.slice(1).map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyItem}
            onPress={() => handleStoryPress(story)}
          >
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            <View style={styles.storyOverlay}>
              <View style={[
                styles.avatarContainer,
                story.isViewed ? styles.viewedAvatar : styles.unviewedAvatar
              ]}>
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyUserName} numberOfLines={2}>
                {story.user}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  createStory: {
    width: 110,
    height: 180,
    borderRadius: 12,
    marginRight: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  createStoryImage: {
    width: '100%',
    height: '70%',
  },
  createStoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  plusButton: {
    position: 'absolute',
    top: -15,
    backgroundColor: '#1877F2',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  createStoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    textAlign: 'center',
  },
  storyItem: {
    width: 110,
    height: 180,
    borderRadius: 12,
    marginRight: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 2,
    alignSelf: 'flex-start',
  },
  unviewedAvatar: {
    backgroundColor: '#1877F2',
  },
  viewedAvatar: {
    backgroundColor: '#BCC0C4',
  },
  storyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  storyUserName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});