import { MediaItem } from '@/types';
import { MOCK_HERO_MOVIE, MOCK_TRENDING_MOVIES, MOCK_POPULAR_SHOWS } from './mockData';

/**
 * Service layer for media catalog.
 * When the Python FastAPI backend is created, these functions will call the REST API.
 */

// Simulated network delay to mimic real HTTP API requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const movieService = {
  async getHeroMedia(): Promise<MediaItem> {
    await delay(200);
    return MOCK_HERO_MOVIE;
  },

  async getTrending(): Promise<MediaItem[]> {
    await delay(300);
    return MOCK_TRENDING_MOVIES;
  },

  async getPopularShows(): Promise<MediaItem[]> {
    await delay(300);
    return MOCK_POPULAR_SHOWS;
  },

  async getMediaById(id: string): Promise<MediaItem | null> {
    await delay(200);
    const all = [...MOCK_TRENDING_MOVIES, ...MOCK_POPULAR_SHOWS];
    return all.find((item) => item.id === id) || null;
  },

  async search(query: string, genre?: string): Promise<MediaItem[]> {
    await delay(250);
    const all = [...MOCK_TRENDING_MOVIES, ...MOCK_POPULAR_SHOWS];
    return all.filter((item) => {
      const matchesQuery =
        !query.trim() ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.overview.toLowerCase().includes(query.toLowerCase());

      const matchesGenre = !genre || genre === 'All' || item.genres.includes(genre);

      return matchesQuery && matchesGenre;
    });
  },
};
