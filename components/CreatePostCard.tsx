import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, Image as ImageIcon, Smile } from 'lucide-react-native';

interface CreatePostCardProps {
  onPress: () => void;
}

export default function CreatePostCard({ onPress }: CreatePostCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.inputButton} onPress={onPress}>
          <Text style={styles.inputText}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Camera size={20} color="#F02849" strokeWidth={2} />
          <Text style={styles.actionText}>Live</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <ImageIcon size={20} color="#45BD62" strokeWidth={2} />
          <Text style={styles.actionText}>Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Smile size={20} color="#F7B928" strokeWidth={2} />
          <Text style={styles.actionText}>Feeling</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  inputButton: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EA',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#65676B',
    marginLeft: 6,
  },
});