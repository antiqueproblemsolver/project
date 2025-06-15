import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Camera, Image as ImageIcon, Video, Smile, MapPin, Users, X, Send } from 'lucide-react-native';
import Header from '@/components/Header';

export default function CreateScreen() {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<'text' | 'photo' | 'video' | 'live'>('text');

  const handlePost = async () => {
    if (postText.trim().length === 0 && selectedImages.length === 0) {
      Alert.alert('Empty Post', 'Please add some content to your post.');
      return;
    }

    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      setPostText('');
      setSelectedImages([]);
      Alert.alert('Success', 'Your post has been shared!');
    }, 2000);
  };

  const addImage = () => {
    // Simulate adding an image
    const newImage = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400`;
    setSelectedImages([...selectedImages, newImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const postTypes = [
    { type: 'text', icon: <Send size={20} color="#1877F2" strokeWidth={2} />, label: 'Text Post' },
    { type: 'photo', icon: <ImageIcon size={20} color="#1877F2" strokeWidth={2} />, label: 'Photo' },
    { type: 'video', icon: <Video size={20} color="#1877F2" strokeWidth={2} />, label: 'Video' },
    { type: 'live', icon: <Camera size={20} color="#E41E3F" strokeWidth={2} />, label: 'Go Live' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Create Post" showMessages={false} showNotifications={false} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Post Type Selector */}
        <View style={styles.postTypeContainer}>
          {postTypes.map((type) => (
            <TouchableOpacity
              key={type.type}
              style={[
                styles.postTypeButton,
                postType === type.type && styles.activePostType
              ]}
              onPress={() => setPostType(type.type as any)}
            >
              {type.icon}
              <Text style={[
                styles.postTypeText,
                postType === type.type && styles.activePostTypeText
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <TouchableOpacity style={styles.privacyButton}>
              <Users size={14} color="#65676B" strokeWidth={2} />
              <Text style={styles.privacyText}>Friends</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#65676B"
            multiline
            value={postText}
            onChangeText={setPostText}
            maxLength={2000}
          />

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <View style={styles.imagesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.selectedImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <X size={16} color="#FFFFFF" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Character Count */}
          <Text style={styles.characterCount}>{postText.length}/2000</Text>
        </View>

        {/* Media Options */}
        <View style={styles.mediaOptions}>
          <Text style={styles.mediaTitle}>Add to your post</Text>
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={addImage}>
              <ImageIcon size={24} color="#45BD62" strokeWidth={2} />
              <Text style={styles.mediaButtonText}>Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton}>
              <Video size={24} color="#F02849" strokeWidth={2} />
              <Text style={styles.mediaButtonText}>Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton}>
              <Smile size={24} color="#F7B928" strokeWidth={2} />
              <Text style={styles.mediaButtonText}>Feeling</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton}>
              <MapPin size={24} color="#1877F2" strokeWidth={2} />
              <Text style={styles.mediaButtonText}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={[
            styles.postButton,
            (postText.trim().length === 0 && selectedImages.length === 0) && styles.disabledButton
          ]}
          onPress={handlePost}
          disabled={isPosting || (postText.trim().length === 0 && selectedImages.length === 0)}
        >
          <Text style={[
            styles.postButtonText,
            (postText.trim().length === 0 && selectedImages.length === 0) && styles.disabledButtonText
          ]}>
            {isPosting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
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
  postTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  postTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activePostType: {
    backgroundColor: '#E7F3FF',
  },
  postTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
    marginLeft: 4,
  },
  activePostTypeText: {
    color: '#1877F2',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginBottom: 4,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4E6EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  privacyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
    marginLeft: 4,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1C1E21',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imagesContainer: {
    marginTop: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E41E3F',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    textAlign: 'right',
    marginTop: 8,
  },
  mediaOptions: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  mediaTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginBottom: 12,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediaButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
    marginTop: 4,
  },
  postButton: {
    backgroundColor: '#1877F2',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E4E6EA',
  },
  postButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#BCC0C4',
  },
});