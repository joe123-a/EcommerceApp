import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, IconName} from './Icon';
import {RouteName, useNav} from '../nav';
import {colors, radius, text} from '../theme';
import {useStore} from '../store';

const tabs: {name: RouteName; label: string; icon: IconName}[] = [
  {name: 'Home', label: 'Home', icon: 'home'},
  {name: 'Explore', label: 'Explore', icon: 'search'},
  {name: 'Wishlist', label: 'Wishlist', icon: 'heart'},
  {name: 'Cart', label: 'Cart', icon: 'cart'},
  {name: 'Profile', label: 'Profile', icon: 'user'},
];

export function BottomTabBar({active}: {active: RouteName}) {
  const insets = useSafeAreaInsets();
  const nav = useNav();
  const {cartCount, wishlist} = useStore();

  return (
    <View style={[styles.wrap, {paddingBottom: Math.max(insets.bottom, 10)}]}>
      {tabs.map(tab => {
        const isActive = active === tab.name;
        const count =
          tab.name === 'Cart'
            ? cartCount
            : tab.name === 'Wishlist'
            ? wishlist.length
            : 0;

        return (
          <Pressable
            key={tab.name}
            onPress={() => nav.switchTab(tab.name)}
            style={styles.item}>
            <View>
              <Icon
                name={tab.icon}
                size={22}
                color={isActive ? colors.primary : colors.faint}
                strokeWidth={isActive ? 2.2 : 1.9}
              />
              {count > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                text.tiny,
                {
                  marginTop: 4,
                  color: isActive ? colors.primary : colors.faint,
                  fontWeight: isActive ? '800' : '600',
                },
              ]}>
              {tab.label}
            </Text>
            <View
              style={[
                styles.indicator,
                {backgroundColor: isActive ? colors.primary : 'transparent'},
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export function TabLayout({
  children,
  active,
}: {
  children: React.ReactNode;
  active: RouteName;
}) {
  return (
    <SafeAreaView edges={['top']} style={styles.layout}>
      <View style={styles.content}>{children}</View>
      <BottomTabBar active={active} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {flex: 1, backgroundColor: colors.white},
  content: {flex: 1},
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    paddingTop: 10,
    paddingHorizontal: 6,
    shadowColor: '#0E1116',
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 14,
  },
  item: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {fontSize: 8, fontWeight: '800', color: colors.white},
  indicator: {
    marginTop: 3,
    width: 4,
    height: 4,
    borderRadius: radius.pill,
  },
});
