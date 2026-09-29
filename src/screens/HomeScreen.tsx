import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaContainer, HeroBanner, MediaSection } from '@/components';
import { movieService } from '@/services';
import { MediaItem } from '@/types';
import { spacing } from '@/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [heroMedia, setHeroMedia] = useState<MediaItem | null>(null);
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [popularShows, setPopularShows] = useState<MediaItem[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [hero, trend, shows] = await Promise.all([
        movieService.getHeroMedia(),
        movieService.getTrending(),
        movieService.getPopularShows(),
      ]);

      setHeroMedia(hero);
      setTrending(trend);
      setPopularShows(shows);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSelectMedia = (media: MediaItem) => {
    navigation.navigate('MediaDetails', { mediaId: media.id });
  };

  const handlePlayMedia = (media: MediaItem) => {
    const stream = media.streamSources?.[0];
    if (stream) {
      navigation.navigate('Player', {
        mediaId: media.id,
        streamUrl: stream.streamUrl,
        title: media.title,
      });
    } else {
      navigation.navigate('MediaDetails', { mediaId: media.id });
    }
  };

  if (loading) {
    return (
      <SafeAreaContainer style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D74CE" />
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0D74CE"
          />
        }
      >
        {/* Top Featured Hero Banner */}
        {heroMedia && (
          <HeroBanner
            media={heroMedia}
            onPlay={handlePlayMedia}
            onPressDetails={handleSelectMedia}
          />
        )}

        <View style={styles.sectionsContainer}>
          {/* Trending Movies Row */}
          <MediaSection
            title="Trending Movies"
            items={trending}
            onSelectMedia={handleSelectMedia}
          />

          {/* Popular TV Shows Row */}
          <MediaSection
            title="Popular TV Shows"
            items={popularShows}
            onSelectMedia={handleSelectMedia}
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
    backgroundColor: '#0A0A0A',
  },
  sectionsContainer: {
    marginTop: spacing.md,
  },
});
