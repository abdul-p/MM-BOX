/**
 * Core media domain models for MM-BOX.
 * These TypeScript interfaces match the Pydantic schemas we will build in FastAPI (Phase 2).
 */

export type MediaType = 'movie' | 'tv';

export interface StreamSource {
  id: string;
  name: string; // e.g. "Server 1 (HLS 1080p)", "Server 2 (720p)"
  quality: '1080p' | '720p' | '480p' | 'auto';
  streamUrl: string; // .m3u8 HLS or .mp4 URL
  isHls?: boolean;
}

export interface Episode {
  id: string;
  showId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  overview: string;
  thumbnailUrl: string;
  durationMinutes: number;
  streamSources: StreamSource[];
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodeCount: number;
  episodes: Episode[];
}

export interface MediaItem {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number; // e.g., 8.7
  releaseYear: number;
  genres: string[];
  type: MediaType;
  cast?: string[];
  durationMinutes?: number; // for movies
  totalSeasons?: number; // for TV shows
  seasons?: Season[]; // for TV shows
  streamSources?: StreamSource[]; // for movies
}

export interface WatchHistoryItem {
  mediaId: string;
  media: MediaItem;
  episodeId?: string; // if it was a TV show episode
  seasonNumber?: number;
  episodeNumber?: number;
  positionSeconds: number;
  durationSeconds: number;
  lastWatchedAt: string; // ISO date string
}
