import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, Info, LogOut, Users, Bookmark, Clock, Archive, Heart, ShoppingBag, CreditCard, Gift, Star } from 'lucide-react-native';
import Header from '@/components/Header';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

function MenuItem({ icon, title, subtitle, onPress, showArrow = true }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MenuScreen() {
  const handleMenuPress = (item: string) => {
    console.log('Menu item pressed:', item);
    // Navigation logic would go here
  };

  return (
    <View style={styles.container}>
      <Header title="Menu" showMessages={false} showNotifications={false} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon={<User size={20} color="#1877F2" strokeWidth={2} />}
            title="Profile"
            subtitle="Manage your profile information"
            onPress={() => handleMenuPress('profile')}
          />
          <MenuItem
            icon={<Settings size={20} color="#1877F2" strokeWidth={2} />}
            title="Settings"
            subtitle="Privacy, notifications, and more"
            onPress={() => handleMenuPress('settings')}
          />
          <MenuItem
            icon={<Bell size={20} color="#1877F2" strokeWidth={2} />}
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() => handleMenuPress('notifications')}
          />
        </View>

        {/* Social Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          <MenuItem
            icon={<Users size={20} color="#1877F2" strokeWidth={2} />}
            title="Friends"
            subtitle="Find and manage your friends"
            onPress={() => handleMenuPress('friends')}
          />
          <MenuItem
            icon={<Bookmark size={20} color="#1877F2" strokeWidth={2} />}
            title="Saved Posts"
            subtitle="View your saved content"
            onPress={() => handleMenuPress('saved')}
          />
          <MenuItem
            icon={<Clock size={20} color="#1877F2" strokeWidth={2} />}
            title="Activity Log"
            subtitle="See your recent activity"
            onPress={() => handleMenuPress('activity')}
          />
          <MenuItem
            icon={<Archive size={20} color="#1877F2" strokeWidth={2} />}
            title="Archive"
            subtitle="Archived posts and stories"
            onPress={() => handleMenuPress('archive')}
          />
        </View>

        {/* Shopping Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping</Text>
          <MenuItem
            icon={<ShoppingBag size={20} color="#1877F2" strokeWidth={2} />}
            title="Orders"
            subtitle="Track your recent orders"
            onPress={() => handleMenuPress('orders')}
          />
          <MenuItem
            icon={<Heart size={20} color="#E41E3F" strokeWidth={2} />}
            title="Wishlist"
            subtitle="Items you want to buy later"
            onPress={() => handleMenuPress('wishlist')}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#1877F2" strokeWidth={2} />}
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={() => handleMenuPress('payments')}
          />
          <MenuItem
            icon={<Gift size={20} color="#1877F2" strokeWidth={2} />}
            title="Gift Cards"
            subtitle="Redeem and manage gift cards"
            onPress={() => handleMenuPress('gifts')}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon={<HelpCircle size={20} color="#1877F2" strokeWidth={2} />}
            title="Help Center"
            subtitle="Get help with your account"
            onPress={() => handleMenuPress('help')}
          />
          <MenuItem
            icon={<Star size={20} color="#1877F2" strokeWidth={2} />}
            title="Rate App"
            subtitle="Share your feedback"
            onPress={() => handleMenuPress('rate')}
          />
          <MenuItem
            icon={<Info size={20} color="#1877F2" strokeWidth={2} />}
            title="About"
            subtitle="App information and terms"
            onPress={() => handleMenuPress('about')}
          />
          <MenuItem
            icon={<Shield size={20} color="#1877F2" strokeWidth={2} />}
            title="Privacy Policy"
            subtitle="Learn how we protect your data"
            onPress={() => handleMenuPress('privacy')}
          />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <MenuItem
            icon={<LogOut size={20} color="#E41E3F" strokeWidth={2} />}
            title="Log Out"
            onPress={() => handleMenuPress('logout')}
            showArrow={false}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SocialBook v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ using React Native and Expo
          </Text>
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
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#65676B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F2F5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1C1E21',
  },
  menuItemSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    marginTop: 4,
    textAlign: 'center',
  },
});