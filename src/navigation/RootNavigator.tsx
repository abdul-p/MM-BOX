import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { MediaDetailsScreen, PlayerScreen } from '@/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const appNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0A0A0A',
    card: '#0D0D0D',
    text: '#FFFFFF',
    border: '#1F1F1F',
    primary: '#0D74CE',
  },
};

/**
 * Root Stack Navigator containing the bottom tabs, media details screen, and video player.
 */
export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={appNavigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="MediaDetails"
          component={MediaDetailsScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            animation: 'fade',
            presentation: 'fullScreenModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
