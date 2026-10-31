import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {useNav} from '../nav';
import {colors, radius, text} from '../theme';

export function SplashScreen() {
  const nav = useNav();
  const navRef = useRef(nav);
  navRef.current = nav;
  const appear = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const timer = setTimeout(() => navRef.current.replace('Onboarding1'), 2100);
    return () => clearTimeout(timer);
  }, [appear, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.blob, styles.blobOne]} />
      <View style={[styles.blob, styles.blobTwo]} />
      <View style={[styles.blob, styles.blobThree]} />

      <SafeAreaView style={styles.safe}>
        <Animated.View
          style={[
            styles.center,
            {
              opacity: appear,
              transform: [
                {
                  scale: appear.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.86, 1],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.logoTile}>
            <Icon name="bag" size={44} color={colors.primary} strokeWidth={2.1} />
          </View>
          <Text style={styles.brand}>ShopPlus</Text>
          <Text style={styles.tagline}>Better Choices, Brighter Days</Text>
        </Animated.View>

        <View style={styles.footer}>
          <Animated.View style={[styles.spinner, {transform: [{rotate}]}]} />
          <Text style={styles.loading}>Loading your shopping experience…</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.primary, overflow: 'hidden'},
  safe: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  blob: {
    position: 'absolute',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  blobOne: {width: 420, height: 420, top: -140, right: -160},
  blobTwo: {width: 280, height: 280, bottom: 80, left: -130},
  blobThree: {width: 160, height: 160, top: 120, left: -60},
  center: {alignItems: 'center'},
  logoTile: {
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7A2A08',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  brand: {
    marginTop: 26,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -1.2,
    color: colors.white,
  },
  tagline: {
    marginTop: 8,
    fontSize: 14.5,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.86)',
    letterSpacing: 0.1,
  },
  footer: {
    position: 'absolute',
    bottom: 56,
    alignItems: 'center',
    gap: 16,
  },
  spinner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.4,
    borderColor: 'rgba(255,255,255,0.28)',
    borderTopColor: colors.white,
    borderRightColor: colors.white,
  },
  loading: {
    ...text.tiny,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
