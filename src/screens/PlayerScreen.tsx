import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaContainer } from '@/components';
import { useHistoryStore } from '@/stores';
import { movieService } from '@/services';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

type PlayerRouteProp = RouteProp<RootStackParamList, 'Player'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PlayerScreen: React.FC = () => {
  const route = useRoute<PlayerRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { mediaId, streamUrl, title, episodeTitle } = route.params;

  const { saveProgress } = useHistoryStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const currentPosition = 120; // 2 mins sample progress

  // Track continue watching in store when player opens
  useEffect(() => {
    async function trackHistory() {
      const media = await movieService.getMediaById(mediaId);
      if (media) {
        saveProgress(media, currentPosition, 7200);
      }
    }
    trackHistory();
  }, [mediaId, currentPosition, saveProgress]);

  return (
    <SafeAreaContainer style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>

        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.mainTitle}>
            {title}
          </Text>
          {episodeTitle && (
            <Text numberOfLines={1} style={styles.subtitle}>
              {episodeTitle}
            </Text>
          )}
        </View>

        <View style={styles.qualityPill}>
          <Text style={styles.qualityText}>1080p HLS</Text>
        </View>
      </View>

      {/* Main Video View Stage */}
      <View style={styles.playerStage}>
        <View style={styles.playerPlaceholder}>
          <Ionicons name="film" size={64} color="#0D74CE" />
          <Text style={styles.streamStatusTitle}>Live HLS Stream Ready</Text>
          <Text style={styles.streamUrlText} numberOfLines={1}>
            {streamUrl}
          </Text>

          {/* Central Play/Pause Control */}
          <Pressable
            onPress={() => setIsPlaying(!isPlaying)}
            style={({ pressed }) => [styles.playToggle, pressed && styles.pressed]}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#FFF" />
          </Pressable>
        </View>
      </View>

      {/* Video Controls & Stream Server Selection */}
      <View style={styles.controlsSection}>
        <Text style={styles.sectionHeader}>STREAM SOURCES</Text>

        <View style={styles.serverRow}>
          <Pressable style={[styles.serverPill, styles.serverPillActive]}>
            <Ionicons name="server" size={14} color="#FFF" />
            <Text style={styles.serverPillTextActive}>Server 1 (HLS Multi-bitrate)</Text>
          </Pressable>

          <Pressable style={styles.serverPill}>
            <Ionicons name="cloud-download-outline" size={14} color="#9CA3AF" />
            <Text style={styles.serverPillText}>Backup CDN (720p)</Text>
          </Pressable>
        </View>

        {/* Learning Note */}
        <View style={styles.infoBox}>
          <Ionicons name="school-outline" size={18} color="#0D74CE" />
          <Text style={styles.infoText}>
            Phase 4 will link this directly to <Text style={styles.bold}>expo-video</Text>{' '}
            and your Python FastAPI HLS streamer for adaptive bitrate streaming!
          </Text>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  mainTitle: {
    ...typography.body,
    color: '#FFF',
    fontWeight: '700',
  },
  subtitle: {
    ...typography.caption,
    color: '#9CA3AF',
  },
  qualityPill: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#333',
  },
  qualityText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  playerStage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerPlaceholder: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  streamStatusTitle: {
    ...typography.h3,
    color: '#FFF',
    marginTop: spacing.xs,
  },
  streamUrlText: {
    ...typography.caption,
    color: '#6B7280',
    maxWidth: 280,
  },
  playToggle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D74CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    shadowColor: '#0D74CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
  controlsSection: {
    padding: spacing.md,
    marginTop: spacing.md,
  },
  sectionHeader: {
    ...typography.caption,
    color: '#6B7280',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  serverRow: {
    gap: spacing.sm,
  },
  serverPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#141414',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#262626',
  },
  serverPillActive: {
    backgroundColor: 'rgba(13, 116, 206, 0.15)',
    borderColor: '#0D74CE',
  },
  serverPillText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  serverPillTextActive: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: spacing.md,
    borderRadius: radii.md,
    marginTop: spacing.xl,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  infoText: {
    ...typography.caption,
    color: '#9CA3AF',
    flex: 1,
    lineHeight: 18,
  },
  bold: {
    color: '#0D74CE',
    fontWeight: '700',
  },
});
