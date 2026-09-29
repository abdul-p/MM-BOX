import { create } from 'zustand';
import { WatchHistoryItem, MediaItem } from '@/types';

interface HistoryState {
  history: WatchHistoryItem[];
  saveProgress: (
    media: MediaItem,
    positionSeconds: number,
    durationSeconds: number,
    episodeId?: string,
    seasonNumber?: number,
    episodeNumber?: number
  ) => void;
  getProgress: (mediaId: string, episodeId?: string) => WatchHistoryItem | undefined;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],

  saveProgress: (
    media,
    positionSeconds,
    durationSeconds,
    episodeId,
    seasonNumber,
    episodeNumber
  ) => {
    const existing = get().history.filter(
      (item) => !(item.mediaId === media.id && item.episodeId === episodeId)
    );

    const newItem: WatchHistoryItem = {
      mediaId: media.id,
      media,
      episodeId,
      seasonNumber,
      episodeNumber,
      positionSeconds,
      durationSeconds,
      lastWatchedAt: new Date().toISOString(),
    };

    set({ history: [newItem, ...existing] });
  },

  getProgress: (mediaId, episodeId) => {
    return get().history.find(
      (item) => item.mediaId === mediaId && item.episodeId === episodeId
    );
  },
}));
