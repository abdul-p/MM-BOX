import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MediaItem } from '@/types';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useWatchlistStore } from '@/stores';

interface HeroBannerProps {
  media: MediaItem;
  onPlay: (media: MediaItem) => void;
  onPressDetails: (media: MediaItem) => void;
}

/**
 * Top featured hero movie banner with playback and watchlist quick-actions.
 */
export const HeroBanner: React.FC<HeroBannerProps> = ({
  media,
  onPlay,
  onPressDetails,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlistStore();
  const bookmarked = isInWatchlist(media.id);

  return (
    <Pressable onPress={() => onPressDetails(media)} style={styles.container}>
      <Image
        source={{ uri: media.backdropUrl }}
        style={styles.backdrop}
        resizeMode="cover"
      />

      {/* Dark overlay for contrast */}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>FEATURED</Text>
            </View>
            <Text style={styles.genreText}>{media.genres.join(' • ')}</Text>
          </View>

          <Text numberOfLines={2} style={styles.title}>
            {media.title}
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <Pressable
              onPress={() => onPlay(media)}
              style={({ pressed }) => [
                styles.playButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons name="play" size={20} color="#FFF" />
              <Text style={styles.playButtonText}>Watch Now</Text>
            </Pressable>

            <Pressable
              onPress={() => toggleWatchlist(media)}
              style={({ pressed }) => [
                styles.watchlistButton,
                bookmarked && styles.watchlistButtonActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={bookmarked ? '#0D74CE' : '#FFF'}
              />
              <Text
                style={[
                  styles.watchlistButtonText,
                  bookmarked && styles.watchlistButtonTextActive,
                ]}
              >
                {bookmarked ? 'Saved' : 'Watchlist'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0A0A0A',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  content: {
    gap: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featuredBadge: {
    backgroundColor: '#0D74CE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  featuredText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  genreText: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    ...typography.h1,
    color: '#FFF',
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D74CE',
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: spacing.xs,
  },
  playButtonText: {
    ...typography.button,
    color: '#FFF',
  },
  watchlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    borderRadius: radii.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  watchlistButtonActive: {
    backgroundColor: 'rgba(13, 116, 206, 0.15)',
    borderColor: '#0D74CE',
  },
  watchlistButtonText: {
    ...typography.button,
    color: '#FFF',
  },
  watchlistButtonTextActive: {
    color: '#0D74CE',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
