import React from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {img} from '../assets';
import {Icon, IconName} from '../components/Icon';
import {TabLayout} from '../components/BottomTabBar';
import {Avatar, Badge} from '../components/ui';
import {money, orders} from '../data';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, radius, space, text} from '../theme';

const menu: {icon: IconName; label: string; note?: string}[] = [
  {icon: 'pin', label: 'My Addresses', note: '3 saved'},
  {icon: 'card', label: 'Payment Methods', note: 'MTN, Visa'},
  {icon: 'help', label: 'Help & Support'},
  {icon: 'settings', label: 'Settings'},
];

const statusTone = {
  Delivered: 'success',
  Processing: 'warning',
  Shipped: 'info',
} as const;

export function ProfileScreen() {
  const nav = useNav();
  const {wishlist, signOut} = useStore();

  return (
    <TabLayout active="Profile">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={{width: 42}} />
        <Text style={text.title}>Profile</Text>
        <Pressable style={styles.headerBtn} hitSlop={6}>
          <Icon name="settings" size={19} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.profileCard}>
          <Avatar size={74} uri={img.avatar} />
          <View style={{flex: 1}}>
            <Text style={styles.name}>Mugamba Joel</Text>
            <View style={styles.memberRow}>
              <View style={styles.goldDot}>
                <Icon name="star" size={10} color={colors.white} />
              </View>
              <Text style={styles.member}>Gold Member</Text>
            </View>
            <Text style={styles.contact}>+256 772 123 456</Text>
          </View>
          <Pressable style={styles.editBtn} hitSlop={6}>
            <Icon name="chevronRight" size={16} color={colors.muted} />
          </Pressable>
        </View>

        <View style={styles.stats}>
          <Stat value="12" label="Orders" onPress={() => nav.push('Orders')} />
          <View style={styles.statDivider} />
          <Stat
            value={String(wishlist.length)}
            label="Wishlist"
            onPress={() => nav.switchTab('Wishlist')}
          />
          <View style={styles.statDivider} />
          <Stat value="5" label="Addresses" onPress={() => {}} />
        </View>

        <View style={styles.sectionHead}>
          <Text style={text.h3}>My Orders</Text>
          <Pressable onPress={() => nav.push('Orders')} hitSlop={8}>
            <Text style={styles.seeAll}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.orders}>
          {orders.map(order => (
            <Pressable
              key={order.id}
              style={styles.order}
              onPress={() => nav.push('Orders')}>
              <View style={styles.orderIcon}>
                <Icon name="bag" size={17} color={colors.primary} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderMeta}>
                  {order.date} · {money(order.total)}
                </Text>
              </View>
              <Badge
                label={order.status}
                tone={statusTone[order.status]}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.menu}>
          {menu.map((item, index) => (
            <Pressable
              key={item.label}
              style={[
                styles.menuRow,
                index < menu.length - 1 ? styles.menuRowBorder : null,
              ]}>
              <View style={styles.menuIcon}>
                <Icon name={item.icon} size={18} color={colors.inkSoft} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.note ? <Text style={styles.menuNote}>{item.note}</Text> : null}
              <Icon name="chevronRight" size={16} color={colors.faint} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.signOut}
          onPress={() => {
            signOut();
            nav.reset('Login');
          }}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        <Text style={styles.version}>ShopPlus · v1.0.0</Text>
      </ScrollView>
    </TabLayout>
  );
}

function Stat({
  value,
  label,
  onPress,
}: {
  value: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.stat} onPress={onPress}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.xl,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {paddingHorizontal: space.xl, paddingBottom: space.xxl},

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },
  name: {fontSize: 19, fontWeight: '800', color: colors.ink, letterSpacing: -0.4},
  memberRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5},
  goldDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  member: {fontSize: 11.5, fontWeight: '700', color: colors.gold},
  contact: {fontSize: 12, fontWeight: '500', color: colors.muted, marginTop: 6},
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: space.lg,
    paddingVertical: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  stat: {flex: 1, alignItems: 'center'},
  statValue: {fontSize: 20, fontWeight: '800', color: colors.ink, letterSpacing: -0.5},
  statLabel: {fontSize: 11.5, fontWeight: '600', color: colors.muted, marginTop: 3},
  statDivider: {width: 1, height: 26, backgroundColor: colors.line},

  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.xxl,
    marginBottom: space.md,
  },
  seeAll: {fontSize: 12.5, fontWeight: '700', color: colors.primary},

  orders: {gap: 10},
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderId: {fontSize: 13.5, fontWeight: '700', color: colors.ink},
  orderMeta: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 2},

  menu: {
    marginTop: space.xxl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  menuRowBorder: {borderBottomWidth: 1, borderBottomColor: colors.line},
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {flex: 1, fontSize: 13.5, fontWeight: '600', color: colors.ink},
  menuNote: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginRight: 4},

  signOut: {
    marginTop: space.xl,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {fontSize: 14, fontWeight: '700', color: colors.danger},
  version: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    color: colors.faint,
    marginTop: space.lg,
  },
});
