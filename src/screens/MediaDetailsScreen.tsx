import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaContainer } from '@/components';
import { movieService } from '@/services';
import { MediaItem, Episode } from '@/types';
import { useWatchlistStore } from '@/stores';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type DetailsRouteProp = RouteProp<RootStackParamList, 'MediaDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MediaDetailsScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { mediaId } = route.params;

  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  const { isInWatchlist, toggleWatchlist } = useWatchlistStore();
  const bookmarked = media ? isInWatchlist(media.id) : false;

  useEffect(() => {
    async function fetchMedia() {
      const data = await movieService.getMediaById(mediaId);
      setMedia(data);
      setLoading(false);
    }
    fetchMedia();
  }, [mediaId]);

  const handlePlayMovie = () => {
    if (!media) return;
    const stream = media.streamSources?.[0];
    if (stream) {
      navigation.navigate('Player', {
        mediaId: media.id,
        streamUrl: stream.streamUrl,
        title: media.title,
      });
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    if (!media) return;
    const stream = episode.streamSources?.[0];
    if (stream) {
      navigation.navigate('Player', {
        mediaId: media.id,
        streamUrl: stream.streamUrl,
        title: media.title,
        episodeTitle: `S${episode.seasonNumber}E${episode.episodeNumber}: ${episode.title}`,
      });
    }
  };

  if (loading || !media) {
    return (
      <SafeAreaContainer style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0D74CE" />
      </SafeAreaContainer>
    );
  }

  const currentSeason = media.seasons?.[selectedSeasonIndex];

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Backdrop Image Header */}
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: media.backdropUrl }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={styles.backdropOverlay} />

          {/* Floating Back Button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </Pressable>
        </View>

        {/* Poster & Main Meta Details */}
        <View style={styles.headerSection}>
          <Image
            source={{ uri: media.posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{media.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{media.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.metaItem}>{media.releaseYear}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaItem}>
                {media.type === 'movie'
                  ? `${media.durationMinutes} mins`
                  : `${media.totalSeasons || 1} Seasons`}
              </Text>
            </View>

            {/* Genre Pills */}
            <View style={styles.genreList}>
              {media.genres.map((g) => (
                <View key={g} style={styles.genreBadge}>
                  <Text style={styles.genreText}>{g}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Pressable
            onPress={
              media.type === 'movie'
                ? handlePlayMovie
                : () => {
                    const firstEp = currentSeason?.episodes?.[0];
                    if (firstEp) handlePlayEpisode(firstEp);
                  }
            }
            style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}
          >
            <Ionicons name="play" size={20} color="#FFF" />
            <Text style={styles.playButtonText}>Watch Now</Text>
          </Pressable>

          <Pressable
            onPress={() => toggleWatchlist(media)}
            style={({ pressed }) => [
              styles.watchlistButton,
              bookmarked && styles.watchlistButtonActive,
              pressed && styles.pressed,
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
              {bookmarked ? 'In Watchlist' : 'Add to Watchlist'}
            </Text>
          </Pressable>
        </View>

        {/* Synopsis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{media.overview}</Text>
        </View>

        {/* Cast list */}
        {media.cast && media.cast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Starring</Text>
            <Text style={styles.castText}>{media.cast.join(', ')}</Text>
          </View>
        )}

        {/* TV Series Seasons & Episodes Selector */}
        {media.type === 'tv' && media.seasons && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Episodes</Text>

            {/* Season Selector Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.seasonsTabList}
            >
              {media.seasons.map((season, index) => {
                const isActive = index === selectedSeasonIndex;
                return (
                  <Pressable
                    key={season.seasonNumber}
                    onPress={() => setSelectedSeasonIndex(index)}
                    style={[styles.seasonTab, isActive && styles.seasonTabActive]}
                  >
                    <Text
                      style={[
                        styles.seasonTabText,
                        isActive && styles.seasonTabTextActive,
                      ]}
                    >
                      Season {season.seasonNumber}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Episode List */}
            {currentSeason?.episodes.map((ep) => (
              <Pressable
                key={ep.id}
                onPress={() => handlePlayEpisode(ep)}
                style={({ pressed }) => [styles.episodeCard, pressed && styles.pressed]}
              >
                <Image
                  source={{ uri: ep.thumbnailUrl }}
                  style={styles.episodeThumb}
                  resizeMode="cover"
                />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeNumber}>Episode {ep.episodeNumber}</Text>
                  <Text numberOfLines={1} style={styles.episodeTitle}>
                    {ep.title}
                  </Text>
                  <Text style={styles.episodeDuration}>{ep.durationMinutes}m</Text>
                </View>
                <View style={styles.episodePlayIcon}>
                  <Ionicons name="play-circle" size={32} color="#0D74CE" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  backdropContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginTop: -40,
    gap: spacing.md,
  },
  poster: {
    width: 105,
    height: 155,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    backgroundColor: '#1E1E1E',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: '#FFF',
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    gap: 3,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '700',
  },
  metaItem: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  metaDot: {
    color: '#4B5563',
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  genreBadge: {
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  genreText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D74CE',
    paddingVertical: 13,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 13,
    borderRadius: radii.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#333',
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
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: '#FFF',
    marginBottom: spacing.xs,
  },
  overviewText: {
    ...typography.body,
    color: '#D1D5DB',
    lineHeight: 22,
  },
  castText: {
    ...typography.bodySmall,
    color: '#9CA3AF',
  },
  seasonsTabList: {
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  seasonTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  seasonTabActive: {
    backgroundColor: '#0D74CE',
    borderColor: '#0D74CE',
  },
  seasonTabText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  seasonTabTextActive: {
    color: '#FFF',
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    padding: spacing.sm,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#222',
  },
  episodeThumb: {
    width: 90,
    height: 55,
    borderRadius: radii.sm,
    backgroundColor: '#1E1E1E',
  },
  episodeInfo: {
    flex: 1,
    marginLeft: spacing.sm,
    gap: 2,
  },
  episodeNumber: {
    color: '#0D74CE',
    fontSize: 11,
    fontWeight: '700',
  },
  episodeTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  episodeDuration: {
    color: '#6B7280',
    fontSize: 12,
  },
  episodePlayIcon: {
    paddingRight: spacing.xs,
  },
});
