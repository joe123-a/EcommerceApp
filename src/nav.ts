import {createContext, useContext} from 'react';

export type RouteName =
  | 'Splash'
  | 'Onboarding1'
  | 'Onboarding2'
  | 'Onboarding3'
  | 'Login'
  | 'SignUp'
  | 'Home'
  | 'Explore'
  | 'Product'
  | 'Wishlist'
  | 'Cart'
  | 'Checkout'
  | 'MobileMoney'
  | 'Profile'
  | 'Orders'
  | 'Success';

export type Route = {name: RouteName; params?: Record<string, any>};

export type Nav = {
  push: (name: RouteName, params?: Record<string, any>) => void;
  replace: (name: RouteName, params?: Record<string, any>) => void;
  pop: () => void;
  reset: (name: RouteName) => void;
  switchTab: (name: RouteName) => void;
  canGoBack: boolean;
  tab: RouteName;
  openCart: () => void;
};

export const NavContext = createContext<Nav | null>(null);
export const RouteContext = createContext<Route>({name: 'Home'});

export function useNav() {
  const nav = useContext(NavContext);
  if (!nav) {
    throw new Error('useNav must be used inside the navigator');
  }
  return nav;
}

export function useRoute<T = Record<string, any>>() {
  return useContext(RouteContext) as {name: RouteName; params: T};
}
