import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';

/**
 * ShopPlus design tokens.
 * One source of truth for colour, type, spacing and elevation.
 */

export const colors = {
  primary: '#FF6A2B',
  primaryDark: '#E8571A',
  primarySoft: '#FFF1E9',
  primaryFaint: '#FFF8F4',

  ink: '#0E1116',
  inkSoft: '#3D434D',
  muted: '#8A9099',
  faint: '#B4B9C2',

  line: '#ECEEF1',
  surface: '#F6F7F9',
  surfaceDeep: '#EFF1F4',
  white: '#FFFFFF',

  success: '#16A34A',
  successSoft: '#E8F8EE',
  warning: '#F59E0B',
  warningSoft: '#FFF6E5',
  danger: '#EF4444',
  dangerSoft: '#FDECEC',
  info: '#3B82F6',
  infoSoft: '#EAF1FE',

  star: '#FFB020',
  gold: '#C79A2E',
  dark: '#111318',
};

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 999,
};

export const font = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const text = StyleSheet.create({
  display: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -1,
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.7,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.inkSoft,
  },
  bodySm: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
    color: colors.inkSoft,
  },
  label: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: '600',
    color: colors.muted,
  },
  tiny: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.muted,
  },
  price: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

export const shadow = {
  card: {
    shadowColor: '#0E1116',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  } as ViewStyle,
  soft: {
    shadowColor: '#0E1116',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  } as ViewStyle,
  button: {
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 6,
  } as ViewStyle,
  bar: {
    shadowColor: '#0E1116',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 12,
  } as ViewStyle,
};

export const hitSlop = {top: 8, bottom: 8, left: 8, right: 8};

export const hairline = StyleSheet.hairlineWidth;

export const heading = (size: number): TextStyle => ({
  fontSize: size,
  lineHeight: Math.round(size * 1.2),
  fontWeight: '800',
  color: colors.ink,
  letterSpacing: -size * 0.02,
});
