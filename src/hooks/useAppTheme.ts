import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '@/theme';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return {
    isDark,
    colors,
    scheme,
  };
};
