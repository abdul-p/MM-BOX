import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { HomeScreen, SearchScreen, WatchlistScreen, ProfileScreen } from '@/screens';
import { Ionicons } from '@expo/vector-icons';
import { useWatchlistStore } from '@/stores';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom Tab Navigator for primary app sections.
 * Displays tabs for Home, Search, Watchlist (with dynamic count badge), and Profile.
 */
export const TabNavigator: React.FC = () => {
  const { items } = useWatchlistStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0D0D',
          borderTopColor: '#1F1F1F',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#0D74CE',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarBadge: items.length > 0 ? items.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#0D74CE',
            color: '#FFF',
            fontSize: 10,
          },
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
