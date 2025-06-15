import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell, MessageCircle, Search } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showMessages?: boolean;
  showSearch?: boolean;
}

export default function Header({ 
  title, 
  showNotifications = true, 
  showMessages = true, 
  showSearch = false 
}: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          {showSearch && (
            <TouchableOpacity style={styles.actionButton}>
              <Search size={24} color="#1C1E21" strokeWidth={2} />
            </TouchableOpacity>
          )}
          {showMessages && (
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={24} color="#1C1E21" strokeWidth={2} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          )}
          {showNotifications && (
            <TouchableOpacity style={styles.actionButton}>
              <Bell size={24} color="#1C1E21" strokeWidth={2} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1877F2',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E41E3F',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});