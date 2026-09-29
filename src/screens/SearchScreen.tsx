import React, { useState, useEffect, useTransition } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaContainer, MediaCard } from '@/components';
import { movieService, MOCK_GENRES } from '@/services';
import { MediaItem } from '@/types';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();

  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const items = await movieService.search(query, selectedGenre);
      setResults(items);
    });
  }, [query, selectedGenre]);

  const handleSelectMedia = (media: MediaItem) => {
    navigation.navigate('MediaDetails', { mediaId: media.id });
  };

  // Calculate 3-column width dynamically with padding
  const cardWidth = (width - spacing.md * 2 - spacing.sm * 2) / 3;
  const cardHeight = cardWidth * 1.5;

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']} style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies, shows, actors..."
          placeholderTextColor="#6B7280"
          style={styles.input}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      {/* Genre Filter Pills */}
      <View style={styles.genresContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genrePills}
        >
          {MOCK_GENRES.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <Pressable
                key={genre}
                onPress={() => setSelectedGenre(genre)}
                style={[styles.genrePill, isSelected && styles.genrePillActive]}
              >
                <Text
                  style={[styles.genrePillText, isSelected && styles.genrePillTextActive]}
                >
                  {genre}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Search Results Grid */}
      {results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="film-outline" size={48} color="#4B5563" />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for something else or picking another category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
    height: 48,
    borderWidth: 1,
    borderColor: '#2E2E2E',
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },
  genresContainer: {
    marginVertical: spacing.md,
  },
  genrePills: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  genrePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.full,
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  genrePillActive: {
    backgroundColor: '#0D74CE',
    borderColor: '#0D74CE',
  },
  genrePillText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  genrePillTextActive: {
    color: '#FFF',
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
    marginTop: 60,
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
