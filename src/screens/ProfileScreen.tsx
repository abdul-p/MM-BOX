import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaContainer } from '@/components';
import { useWatchlistStore, useHistoryStore } from '@/stores';
import { radii, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { APP_NAME, APP_VERSION } from '@/constants';

export const ProfileScreen: React.FC = () => {
  const { items: watchlistItems } = useWatchlistStore();
  const { history } = useHistoryStore();

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#FFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Streamer</Text>
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>Free Tier • Local Storage</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{watchlistItems.length}</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>History</Text>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PREFERENCES</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="tv-outline" size={20} color="#9CA3AF" />
              <Text style={styles.settingTitle}>Default Stream Quality</Text>
            </View>
            <Text style={styles.settingValue}>Auto (1080p)</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="server-outline" size={20} color="#9CA3AF" />
              <Text style={styles.settingTitle}>Backend API Status</Text>
            </View>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Mock Mode (FastAPI ready)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ABOUT</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
              <Text style={styles.settingTitle}>App Name</Text>
            </View>
            <Text style={styles.settingValue}>{APP_NAME}</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="code-slash-outline" size={20} color="#9CA3AF" />
              <Text style={styles.settingTitle}>Version</Text>
            </View>
            <Text style={styles.settingValue}>v{APP_VERSION} (Expo 57)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: spacing.md,
    borderRadius: radii.xl,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0D74CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  username: {
    ...typography.h3,
    color: '#FFF',
  },
  tierBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  tierText: {
    ...typography.caption,
    color: '#9CA3AF',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    borderRadius: radii.lg,
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: '#252525',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h2,
    color: '#0D74CE',
    fontWeight: '800',
  },
  statLabel: {
    ...typography.caption,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2E2E2E',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    ...typography.caption,
    color: '#6B7280',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161616',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderRadius: radii.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: '#222',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingTitle: {
    ...typography.bodySmall,
    color: '#E5E7EB',
  },
  settingValue: {
    ...typography.bodySmall,
    color: '#9CA3AF',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '600',
  },
});
