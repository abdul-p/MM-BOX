import { create } from 'zustand';
import { MediaItem } from '@/types';

interface WatchlistState {
  items: MediaItem[];
  addToWatchlist: (media: MediaItem) => void;
  removeFromWatchlist: (mediaId: string) => void;
  isInWatchlist: (mediaId: string) => boolean;
  toggleWatchlist: (media: MediaItem) => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  items: [],

  addToWatchlist: (media: MediaItem) => {
    if (!get().isInWatchlist(media.id)) {
      set({ items: [media, ...get().items] });
    }
  },

  removeFromWatchlist: (mediaId: string) => {
    set({ items: get().items.filter((item) => item.id !== mediaId) });
  },

  isInWatchlist: (mediaId: string) => {
    return get().items.some((item) => item.id === mediaId);
  },

  toggleWatchlist: (media: MediaItem) => {
    const isPresent = get().isInWatchlist(media.id);
    if (isPresent) {
      get().removeFromWatchlist(media.id);
    } else {
      get().addToWatchlist(media);
    }
  },
}));
