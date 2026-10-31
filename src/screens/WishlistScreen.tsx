import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from '../components/Icon';
import {TabLayout} from '../components/BottomTabBar';
import {Button, EmptyState} from '../components/ui';
import {byId, money} from '../data';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, radius, space, text} from '../theme';

export function WishlistScreen() {
  const nav = useNav();
  const {wishlist, toggleWish, addToCart} = useStore();
  const items = wishlist.map(byId);

  return (
    <TabLayout active="Wishlist">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={{width: 42}} />
        <View style={styles.titleWrap}>
          <Text style={text.title}>My Wishlist</Text>
          {items.length ? (
            <View style={styles.countPill}>
              <Text style={styles.countText}>{items.length}</Text>
            </View>
          ) : null}
        </View>
        <View style={{width: 42}} />
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your wishlist is empty"
          body="Tap the heart on any product to save it here for later."
          action="Start Shopping"
          onAction={() => nav.switchTab('Home')}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <Text style={styles.hint}>
            Saved items are kept for 30 days. Prices update automatically.
          </Text>

          {items.map(product => (
            <View key={product.id} style={styles.card}>
              <Pressable
                style={styles.media}
                onPress={() => nav.push('Product', {id: product.id})}>
                <Image source={product.image} style={styles.image} resizeMode="cover" />
              </Pressable>

              <View style={styles.body}>
                <View style={styles.bodyTop}>
                  <Text numberOfLines={1} style={styles.name}>
                    {product.name}
                  </Text>
                  <Pressable onPress={() => toggleWish(product.id)} hitSlop={8}>
                    <Icon name="close" size={16} color={colors.faint} />
                  </Pressable>
                </View>

                <View style={styles.stockRow}>
                  <View style={styles.dot} />
                  <Text style={styles.stock}>In Stock</Text>
                </View>

                <View style={styles.bottomRow}>
                  <Text style={styles.price}>{money(product.price)}</Text>
                  <Button
                    label="Move to Cart"
                    size="md"
                    onPress={() => {
                      addToCart(product, {
                        size: product.sizes[3],
                        color: product.colors[0]?.name,
                      });
                      toggleWish(product.id);
                      nav.switchTab('Cart');
                    }}
                    style={styles.moveBtn}
                  />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.note}>
            <Icon name="truck" size={18} color={colors.primary} />
            <Text style={styles.noteText}>
              Items in your wishlist may sell out. Move them to your cart to secure them.
            </Text>
          </View>
        </ScrollView>
      )}
    </TabLayout>
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
  titleWrap: {flexDirection: 'row', alignItems: 'center', gap: 8},
  countPill: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 7,
    borderRadius: 11,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {fontSize: 11, fontWeight: '800', color: colors.primary},
  scroll: {paddingHorizontal: space.xl, paddingBottom: space.xxl},
  hint: {
    ...text.bodySm,
    fontSize: 12,
    color: colors.muted,
    marginBottom: space.lg,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  media: {
    width: 86,
    height: 86,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {width: '100%', height: '100%'},
  body: {flex: 1, justifyContent: 'space-between', paddingVertical: 2},
  bodyTop: {flexDirection: 'row', alignItems: 'center', gap: 8},
  name: {flex: 1, ...text.bodySm, fontSize: 14, fontWeight: '700', color: colors.ink},
  stockRow: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3},
  dot: {width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success},
  stock: {fontSize: 11, fontWeight: '600', color: colors.success},
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  price: {...text.price, fontSize: 14.5},
  moveBtn: {height: 34, paddingHorizontal: 12},
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: space.md,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryFaint,
  },
  noteText: {flex: 1, fontSize: 11.5, fontWeight: '500', color: colors.inkSoft, lineHeight: 16},
});
