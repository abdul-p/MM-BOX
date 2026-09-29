import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MediaItem } from '@/types';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

interface MediaCardProps {
  media: MediaItem;
  onPress: () => void;
  width?: number;
  height?: number;
}

/**
 * Reusable poster card for Movies and TV Shows.
 * Uses Pressable for tactile touch feedback, and Image with absolute rating badge.
 */
export const MediaCard: React.FC<MediaCardProps> = ({
  media,
  onPress,
  width = 130,
  height = 195,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}
    >
      <View style={[styles.imageContainer, { height }]}>
        <Image
          source={{ uri: media.posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Rating Badge Overlay */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={11} color="#FFD700" />
          <Text style={styles.ratingText}>{media.rating.toFixed(1)}</Text>
        </View>

        {/* Media Type Tag (TV / Movie) */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{media.type.toUpperCase()}</Text>
        </View>
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {media.title}
      </Text>
      <Text style={styles.metaText}>
        {media.releaseYear} • {media.genres[0] || 'Drama'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: spacing.md,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    gap: 3,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  typeBadge: {
    position: 'absolute',
    bottom: spacing.xs,
    left: spacing.xs,
    backgroundColor: 'rgba(13, 116, 206, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  typeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
  title: {
    ...typography.bodySmall,
    color: '#FFF',
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  metaText: {
    ...typography.caption,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
