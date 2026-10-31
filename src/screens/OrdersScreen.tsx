import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {AppBar, Badge, Button, Chip} from '../components/ui';
import {money, orders, products} from '../data';
import {useNav} from '../nav';
import {colors, radius, space, text} from '../theme';

const tones = {
  Delivered: 'success',
  Processing: 'warning',
  Shipped: 'info',
} as const;

const FILTERS = ['All', 'Delivered', 'Processing', 'Shipped'] as const;

export function OrdersScreen() {
  const nav = useNav();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const list =
    filter === 'All' ? orders : orders.filter(order => order.status === filter);

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <AppBar
        title="My Orders"
        onBack={() => (nav.canGoBack ? nav.pop() : nav.switchTab('Home'))}
        right={
          <Pressable style={styles.headerBtn} hitSlop={6}>
            <Icon name="filter" size={18} color={colors.ink} />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}>
          {FILTERS.map(item => (
            <Chip
              key={item}
              label={item}
              active={filter === item}
              onPress={() => setFilter(item)}
            />
          ))}
        </ScrollView>

        {list.map((order, index) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHead}>
              <View>
                <Text style={styles.id}>{order.id}</Text>
                <Text style={styles.date}>{order.date}</Text>
              </View>
              <Badge label={order.status} tone={tones[order.status]} />
            </View>

            <View style={styles.items}>
              {products.slice(index, index + 3).map(product => (
                <View key={product.id} style={styles.thumb}>
                  <Image source={product.image} style={styles.thumbImage} />
                </View>
              ))}
              <View style={styles.more}>
                <Text style={styles.moreText}>+2</Text>
              </View>
            </View>

            <View style={styles.cardFoot}>
              <View>
                <Text style={styles.totalLabel}>Order total</Text>
                <Text style={styles.total}>{money(order.total)}</Text>
              </View>
              <View style={styles.actions}>
                <Button
                  label="Track"
                  size="md"
                  variant="outline"
                  full={false}
                  onPress={() => {}}
                  style={{paddingHorizontal: 18}}
                />
                <Button
                  label="Buy Again"
                  size="md"
                  full={false}
                  onPress={() => nav.push('Product', {id: products[index].id})}
                  style={{paddingHorizontal: 18}}
                />
              </View>
            </View>
          </View>
        ))}

        {list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={text.h3}>No {filter.toLowerCase()} orders</Text>
            <Text style={[text.bodySm, {color: colors.muted, marginTop: 6}]}>
              Orders with this status will show up here.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {paddingBottom: space.xxl},
  chips: {paddingHorizontal: space.xl, gap: 8, paddingBottom: space.lg},
  card: {
    marginHorizontal: space.xl,
    marginBottom: 12,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  id: {fontSize: 14, fontWeight: '800', color: colors.ink},
  date: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 3},
  items: {flexDirection: 'row', gap: 8, marginTop: 14},
  thumb: {
    width: 54,
    height: 54,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  thumbImage: {width: '100%', height: '100%'},
  more: {
    width: 54,
    height: 54,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {fontSize: 12, fontWeight: '700', color: colors.muted},
  cardFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  totalLabel: {fontSize: 10.5, fontWeight: '600', color: colors.muted},
  total: {fontSize: 15, fontWeight: '800', color: colors.ink, marginTop: 2},
  actions: {flexDirection: 'row', gap: 8},
  empty: {alignItems: 'center', paddingVertical: 70, paddingHorizontal: 40},
});
