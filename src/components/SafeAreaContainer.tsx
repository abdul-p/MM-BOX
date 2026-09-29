import React from 'react';
import { StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { lightColors, darkColors } from '@/theme';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
}

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
