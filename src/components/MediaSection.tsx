import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MediaItem } from '@/types';
import { MediaCard } from './MediaCard';
import { spacing, typography } from '@/theme';

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  onSelectMedia: (media: MediaItem) => void;
}

/**
 * Section component with a horizontal FlatList.
 * FlatList is used instead of ScrollView + .map for high-performance memory recycling on mobile.
 */
export const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  items,
  onSelectMedia,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MediaCard media={item} onPress={() => onSelectMedia(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    ...typography.h3,
    color: '#FFF',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
  },
});
