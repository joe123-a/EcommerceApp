import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Nav, NavContext, Route, RouteContext, RouteName} from './nav';
import {colors} from './theme';
import {SplashScreen} from './screens/SplashScreen';
import {OnboardingScreen} from './screens/OnboardingScreen';
import {LoginScreen} from './screens/LoginScreen';
import {SignUpScreen} from './screens/SignUpScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ExploreScreen} from './screens/ExploreScreen';
import {ProductScreen} from './screens/ProductScreen';
import {WishlistScreen} from './screens/WishlistScreen';
import {CartScreen} from './screens/CartScreen';
import {CheckoutScreen} from './screens/CheckoutScreen';
import {MobileMoneyScreen} from './screens/MobileMoneyScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import {OrdersScreen} from './screens/OrdersScreen';
import {SuccessScreen} from './screens/SuccessScreen';

const registry: Record<RouteName, React.ComponentType> = {
  Splash: SplashScreen,
  Onboarding1: () => <OnboardingScreen step={1} />,
  Onboarding2: () => <OnboardingScreen step={2} />,
  Onboarding3: () => <OnboardingScreen step={3} />,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Home: HomeScreen,
  Explore: ExploreScreen,
  Product: ProductScreen,
  Wishlist: WishlistScreen,
  Cart: CartScreen,
  Checkout: CheckoutScreen,
  MobileMoney: MobileMoneyScreen,
  Profile: ProfileScreen,
  Orders: OrdersScreen,
  Success: SuccessScreen,
};

export function Navigator() {
  const [stack, setStack] = useState<Route[]>([{name: 'Splash'}]);
  const [tab, setTab] = useState<RouteName>('Home');
  const fade = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;

  const current = stack[stack.length - 1];

  useEffect(() => {
    fade.setValue(0);
    slide.setValue(14);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }, [current.name, stack.length, fade, slide]);

  const push = useCallback((name: RouteName, params?: Record<string, any>) => {
    setStack(prev => [...prev, {name, params}]);
  }, []);

  const replace = useCallback((name: RouteName, params?: Record<string, any>) => {
    setStack(prev => [...prev.slice(0, -1), {name, params}]);
  }, []);

  const pop = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const reset = useCallback((name: RouteName) => {
    setStack([{name}]);
  }, []);

  const switchTab = useCallback((name: RouteName) => {
    setTab(name);
    setStack([{name}]);
  }, []);

  const nav = useMemo<Nav>(
    () => ({
      push,
      replace,
      pop,
      reset,
      switchTab,
      canGoBack: stack.length > 1,
      tab,
      openCart: () => switchTab('Cart'),
    }),
    [push, replace, pop, reset, switchTab, stack.length, tab],
  );

  const ScreenComponent = registry[current.name];

  return (
    <NavContext.Provider value={nav}>
      <RouteContext.Provider value={current}>
        <View style={styles.root}>
          <Animated.View
            key={`${current.name}-${stack.length}`}
            style={[
              styles.fill,
              {opacity: fade, transform: [{translateX: slide}]},
            ]}>
            <ScreenComponent />
          </Animated.View>
        </View>
      </RouteContext.Provider>
    </NavContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  fill: {flex: 1},
});
