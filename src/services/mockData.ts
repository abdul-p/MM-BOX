import { MediaItem } from '@/types';

/**
 * High-quality mock media catalog for MM-BOX.
 * Features legal, open creative-commons videos with real HLS and MP4 streams
 * so you can test real video playback immediately!
 */

export const MOCK_HERO_MOVIE: MediaItem = {
  id: 'm-hero-1',
  title: 'Tears of Steel',
  overview:
    'In a dystopian future, a group of warriors and scientists gather at the Oude Kerk in Amsterdam to stage a crucial historical event in a desperate bid to rescue the world from destructive robots.',
  posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
  backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
  rating: 8.4,
  releaseYear: 2024,
  durationMinutes: 122,
  type: 'movie',
  genres: ['Sci-Fi', 'Action', 'Drama'],
  cast: ['Derek de Lint', 'Vanja Rukavina', 'Denise Rebergen'],
  streamSources: [
    {
      id: 'src-1',
      name: 'Mux HLS (Multi-bitrate)',
      quality: '1080p',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      isHls: true,
    },
    {
      id: 'src-2',
      name: 'Fast CDN (720p)',
      quality: '720p',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      isHls: false,
    },
  ],
};

export const MOCK_TRENDING_MOVIES: MediaItem[] = [
  MOCK_HERO_MOVIE,
  {
    id: 'm-2',
    title: 'Cyber Nexus',
    overview:
      'A lone hacker uncovers a massive corporate conspiracy that threatens humanity’s neural link network across Neo-Tokyo.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
    rating: 8.9,
    releaseYear: 2025,
    durationMinutes: 135,
    type: 'movie',
    genres: ['Action', 'Cyberpunk', 'Thriller'],
    cast: ['Elena Rostova', 'Kenji Sato', 'Marcus Vance'],
    streamSources: [
      {
        id: 'src-cn-1',
        name: 'Primary Stream (HLS)',
        quality: '1080p',
        streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        isHls: true,
      },
    ],
  },
  {
    id: 'm-3',
    title: 'Echoes of the Abyss',
    overview:
      'Deep beneath the Mariana Trench, an underwater drilling expedition awakens an ancient bioluminescent civilization.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1200&q=80',
    rating: 7.8,
    releaseYear: 2024,
    durationMinutes: 110,
    type: 'movie',
    genres: ['Sci-Fi', 'Horror', 'Mystery'],
    cast: ['Sarah Jenkins', 'David Oyelowo', 'Liu Wei'],
    streamSources: [
      {
        id: 'src-abyss-1',
        name: 'Direct Stream (1080p)',
        quality: '1080p',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        isHls: false,
      },
    ],
  },
  {
    id: 'm-4',
    title: 'The Silent Horizon',
    overview:
      'A deep space interstellar crew embarks on a century-long mission only to receive a transmission from Earth that ceased existing decades ago.',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80',
    rating: 9.1,
    releaseYear: 2024,
    durationMinutes: 148,
    type: 'movie',
    genres: ['Sci-Fi', 'Adventure'],
    cast: ['Matthew Vance', 'Jessica Chastain', 'Michael Caine'],
    streamSources: [
      {
        id: 'src-horizon-1',
        name: 'HLS 4K/1080p',
        quality: '1080p',
        streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        isHls: true,
      },
    ],
  },
];

export const MOCK_POPULAR_SHOWS: MediaItem[] = [
  {
    id: 'tv-1',
    title: 'Chronicles of Solaria',
    overview:
      'Noble houses clash for control of a solar-powered floating citadel in the skies above a scorched Earth.',
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    rating: 8.8,
    releaseYear: 2023,
    type: 'tv',
    totalSeasons: 2,
    genres: ['Fantasy', 'Drama', 'Adventure'],
    cast: ['Emilia Clarke', 'Richard Madden', 'Kit Harington'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Ascendance',
        episodeCount: 3,
        episodes: [
          {
            id: 'ep-1-1',
            showId: 'tv-1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'The Sky Citadel',
            overview:
              'The heir to House Solis returns to claim the throne amid whispers of rebellion.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            durationMinutes: 54,
            streamSources: [
              {
                id: 'src-ep1-1',
                name: 'Server 1 (HLS)',
                quality: '1080p',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
                isHls: true,
              },
            ],
          },
          {
            id: 'ep-1-2',
            showId: 'tv-1',
            seasonNumber: 1,
            episodeNumber: 2,
            title: 'Shadows in the Mist',
            overview:
              'A forbidden pact is signed as strange signals echo from the surface ruins below.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
            durationMinutes: 50,
            streamSources: [
              {
                id: 'src-ep1-2',
                name: 'Server 1 (HLS)',
                quality: '1080p',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
                isHls: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tv-2',
    title: 'Silicon Syndicate',
    overview:
      'A gripping techno-thriller detailing the ruthless rise of a cryptographic startup that outsmarts sovereign nations.',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    rating: 8.5,
    releaseYear: 2024,
    type: 'tv',
    totalSeasons: 1,
    genres: ['Drama', 'Crime', 'Tech'],
    cast: ['Rami Malek', 'Christian Slater', 'Carly Chaikin'],
  },
];

export const MOCK_GENRES = [
  'All',
  'Action',
  'Sci-Fi',
  'Drama',
  'Fantasy',
  'Thriller',
  'Horror',
  'Comedy',
  'Animation',
];
