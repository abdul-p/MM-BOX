import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaContainer, MediaCard } from '@/components';
import { useWatchlistStore } from '@/stores';
import { MediaItem } from '@/types';
import { spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WatchlistScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();
  const { items } = useWatchlistStore();

  const handleSelectMedia = (media: MediaItem) => {
    navigation.navigate('MediaDetails', { mediaId: media.id });
  };

  const cardWidth = (width - spacing.md * 2 - spacing.sm * 2) / 3;
  const cardHeight = cardWidth * 1.5;

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Watchlist</Text>
        <Text style={styles.counter}>{items.length} titles</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={54} color="#374151" />
          <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Save movies and TV shows here to keep track of what you want to watch next.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MediaCard
              media={item}
              width={cardWidth}
              height={cardHeight}
              onPress={() => handleSelectMedia(item)}
            />
          )}
        />
      )}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: '#FFF',
  },
  counter: {
    ...typography.caption,
    color: '#9CA3AF',
  },
  gridContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  gridRow: {
    justifyContent: 'flex-start',
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    color: '#FFF',
    marginTop: spacing.md,
  },
  emptySubtitle: {
    ...typography.bodySmall,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
