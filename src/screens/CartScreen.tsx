import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Icon} from '../components/Icon';
import {TabLayout} from '../components/BottomTabBar';
import {Button, Divider, EmptyState, Stepper} from '../components/ui';
import {money} from '../data';
import {useNav} from '../nav';
import {DELIVERY_FEE, useStore} from '../store';
import {colors, radius, shadow, space, text} from '../theme';

export function CartScreen() {
  const nav = useNav();
  const {cart, setQty, removeLine, subtotal, cartCount} = useStore();
  const [promo, setPromo] = useState('');
  const [promoOn, setPromoOn] = useState(false);
  const [promoError, setPromoError] = useState('');

  const discount = promoOn ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 300000 ? 0 : DELIVERY_FEE;
  const total = subtotal - discount + delivery;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'SHOP10') {
      setPromoOn(true);
      setPromoError('');
    } else {
      setPromoOn(false);
      setPromoError('That code isn’t valid. Try SHOP10.');
    }
  };

  return (
    <TabLayout active="Cart">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={{width: 42}} />
        <View style={styles.titleWrap}>
          <Text style={text.title}>Shopping Cart</Text>
          {cartCount ? (
            <View style={styles.countPill}>
              <Text style={styles.countText}>{cartCount}</Text>
            </View>
          ) : null}
        </View>
        <View style={{width: 42}} />
      </View>

      {cart.length === 0 ? (
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          body="Browse our best sellers and add something you love."
          action="Start Shopping"
          onAction={() => nav.switchTab('Home')}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}>
            {cart.map(line => (
              <View key={line.key} style={styles.card}>
                <Pressable
                  style={styles.media}
                  onPress={() => nav.push('Product', {id: line.product.id})}>
                  <Image
                    source={line.product.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </Pressable>

                <View style={styles.body}>
                  <View style={styles.bodyTop}>
                    <Text numberOfLines={1} style={styles.name}>
                      {line.product.name}
                    </Text>
                    <Pressable onPress={() => removeLine(line.key)} hitSlop={8}>
                      <Icon name="close" size={15} color={colors.faint} />
                    </Pressable>
                  </View>

                  <Text style={styles.meta}>
                    {[line.color, line.size ? `Size ${line.size}` : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>

                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>{money(line.product.price)}</Text>
                    <Stepper
                      value={line.qty}
                      onChange={next => setQty(line.key, next)}
                    />
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.promo}>
              <View style={styles.promoInput}>
                <Icon name="card" size={17} color={colors.muted} />
                <TextInput
                  value={promo}
                  onChangeText={value => {
                    setPromo(value);
                    setPromoError('');
                  }}
                  placeholder="Promo code"
                  placeholderTextColor={colors.faint}
                  autoCapitalize="characters"
                  style={styles.promoField}
                />
              </View>
              <Pressable style={styles.applyBtn} onPress={applyPromo}>
                <Text style={styles.applyText}>{promoOn ? 'Applied' : 'Apply'}</Text>
              </Pressable>
            </View>
            {promoError ? <Text style={styles.promoError}>{promoError}</Text> : null}
            {promoOn ? (
              <View style={styles.promoOk}>
                <Icon name="check" size={13} color={colors.success} />
                <Text style={styles.promoOkText}>SHOP10 applied — 10% off your order</Text>
              </View>
            ) : null}

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Subtotal</Text>
                <Text style={styles.rowValue}>{money(subtotal)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Delivery</Text>
                <Text style={styles.rowValue}>
                  {delivery === 0 ? 'Free' : money(delivery)}
                </Text>
              </View>
              {discount > 0 ? (
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Discount</Text>
                  <Text style={[styles.rowValue, {color: colors.success}]}>
                    −{money(discount)}
                  </Text>
                </View>
              ) : null}
              <Divider style={{marginVertical: 14}} />
              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{money(total)}</Text>
              </View>
            </View>

            <View style={styles.secure}>
              <Icon name="lock" size={15} color={colors.muted} />
              <Text style={styles.secureText}>
                Secure checkout · Mobile Money, cards & cash on delivery
              </Text>
            </View>
          </ScrollView>

          <View style={styles.bar}>
            <View>
              <Text style={styles.barLabel}>Total</Text>
              <Text style={styles.barTotal}>{money(total)}</Text>
            </View>
            <Button
              label="Checkout"
              onPress={() => nav.push('Checkout')}
              style={{flex: 1, marginLeft: 16}}
            />
          </View>
        </>
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
  scroll: {paddingHorizontal: space.xl, paddingBottom: space.xl},
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
  },
  media: {
    width: 82,
    height: 82,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {width: '100%', height: '100%'},
  body: {flex: 1, justifyContent: 'space-between', paddingVertical: 2},
  bodyTop: {flexDirection: 'row', alignItems: 'center', gap: 8},
  name: {flex: 1, ...text.bodySm, fontSize: 14, fontWeight: '700', color: colors.ink},
  meta: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 2},
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {...text.price, fontSize: 14.5},

  promo: {flexDirection: 'row', gap: 10, marginTop: space.sm},
  promoInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  promoField: {flex: 1, fontSize: 13.5, fontWeight: '600', color: colors.ink, padding: 0},
  applyBtn: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {fontSize: 13, fontWeight: '700', color: colors.white},
  promoError: {fontSize: 11.5, fontWeight: '600', color: colors.danger, marginTop: 8},
  promoOk: {flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8},
  promoOkText: {fontSize: 11.5, fontWeight: '600', color: colors.success},

  summary: {
    marginTop: space.xl,
    padding: 18,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  summaryTitle: {...text.title, fontSize: 14, marginBottom: 14},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowLabel: {fontSize: 13, fontWeight: '500', color: colors.muted},
  rowValue: {fontSize: 13, fontWeight: '700', color: colors.ink},
  totalLabel: {fontSize: 14, fontWeight: '700', color: colors.ink},
  totalValue: {fontSize: 18, fontWeight: '800', color: colors.ink, letterSpacing: -0.4},
  secure: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: space.lg,
  },
  secureText: {fontSize: 11, fontWeight: '500', color: colors.muted},

  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.xl,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    ...shadow.bar,
  },
  barLabel: {fontSize: 11, fontWeight: '600', color: colors.muted},
  barTotal: {fontSize: 18, fontWeight: '800', color: colors.ink, letterSpacing: -0.4},
});
