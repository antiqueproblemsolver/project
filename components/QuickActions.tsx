import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Video, Calendar, Users, ShoppingBag, Gamepad2, Bookmark, Clock, TrendingUp } from 'lucide-react-native';

interface QuickActionsProps {
  onLiveVideo: () => void;
  onCreateEvent: () => void;
}

const quickActions = [
  { icon: <Video size={20} color="#F02849" strokeWidth={2} />, label: 'Live Video', color: '#F02849' },
  { icon: <Calendar size={20} color="#1877F2" strokeWidth={2} />, label: 'Event', color: '#1877F2' },
  { icon: <Users size={20} color="#42B883" strokeWidth={2} />, label: 'Group', color: '#42B883' },
  { icon: <ShoppingBag size={20} color="#FF6B35" strokeWidth={2} />, label: 'Shop', color: '#FF6B35' },
  { icon: <Gamepad2 size={20} color="#9C27B0" strokeWidth={2} />, label: 'Gaming', color: '#9C27B0' },
  { icon: <Bookmark size={20} color="#795548" strokeWidth={2} />, label: 'Saved', color: '#795548' },
  { icon: <Clock size={20} color="#607D8B" strokeWidth={2} />, label: 'Memories', color: '#607D8B' },
  { icon: <TrendingUp size={20} color="#FF9800" strokeWidth={2} />, label: 'Trending', color: '#FF9800' },
];

export default function QuickActions({ onLiveVideo, onCreateEvent }: QuickActionsProps) {
  const handleActionPress = (label: string) => {
    switch (label) {
      case 'Live Video':
        onLiveVideo();
        break;
      case 'Event':
        onCreateEvent();
        break;
      default:
        console.log(`${label} pressed`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={() => handleActionPress(action.label)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
              {action.icon}
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
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
  actionItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1C1E21',
    textAlign: 'center',
  },
});