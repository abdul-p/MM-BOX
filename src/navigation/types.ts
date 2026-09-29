import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

/**
 * Route parameter definitions for type-safe navigation.
 * Similar to route types in web React Router, but strongly typed for mobile stacks.
 */

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Watchlist: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  MediaDetails: { mediaId: string };
  Player: { mediaId: string; streamUrl: string; title: string; episodeTitle?: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomTabProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;
