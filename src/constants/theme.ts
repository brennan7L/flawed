import { createTheme } from '@shopify/restyle';

const palette = {
  charcoal: '#2F3437',
  softWhite: '#F5F5F5',
  coralRed: '#FF6B6B',
  paleTeal: '#7FBEAB',
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    100: '#F7F7F7',
    200: '#E6E6E6',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

const theme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.softWhite,
    mainForeground: palette.charcoal,
    primary: palette.coralRed,
    secondary: palette.paleTeal,
    cardBackground: palette.white,
    textPrimary: palette.charcoal,
    textSecondary: palette.gray[600],
    border: palette.gray[200],
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  textVariants: {
    header: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'textPrimary',
    },
    subheader: {
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'textPrimary',
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
    label: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 20,
      color: 'textSecondary',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
