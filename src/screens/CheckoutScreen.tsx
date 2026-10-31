import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, IconName} from '../components/Icon';
import {AppBar, Badge, Button, Divider} from '../components/ui';
import {money} from '../data';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, radius, shadow, space, text} from '../theme';

const methods = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    note: '3–5 business days',
    price: 15000,
    icon: 'truck' as IconName,
  },
  {
    id: 'express',
    title: 'Express Delivery',
    note: '1–2 business days',
    price: 25000,
    icon: 'clock' as IconName,
  },
];

const payments = [
  {
    id: 'momo',
    title: 'Mobile Money',
    note: 'MTN & Airtel',
    icon: 'phone' as IconName,
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    note: 'Visa, Mastercard',
    icon: 'card' as IconName,
  },
  {
    id: 'cash',
    title: 'Cash on Delivery',
    note: 'Pay when your order arrives',
    icon: 'wallet' as IconName,
  },
];

export function CheckoutScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const {subtotal, cartCount} = useStore();
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('momo');

  const fee = methods.find(item => item.id === delivery)?.price ?? 0;
  const total = subtotal + fee;

  const placeOrder = () => {
    if (payment === 'momo') {
      nav.push('MobileMoney', {total});
    } else {
      nav.push('Success', {total, payment});
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <AppBar title="Checkout" onBack={nav.pop} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, {paddingBottom: 130 + insets.bottom}]}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Pressable hitSlop={8}>
            <Text style={styles.link}>Change</Text>
          </Pressable>
        </View>

        <View style={styles.address}>
          <View style={styles.addressIcon}>
            <Icon name="pin" size={19} color={colors.primary} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.addressName}>Mugamba Joel</Text>
            <Text style={styles.addressBody}>Plot 12, Kira Road, Kampala</Text>
            <Text style={styles.addressBody}>+256 772 123 456</Text>
          </View>
          <Badge label="Default" tone="neutral" />
        </View>

        <Text style={[styles.sectionTitle, {marginTop: space.xxl}]}>
          Delivery Method
        </Text>
        <View style={styles.options}>
          {methods.map(item => {
            const active = delivery === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setDelivery(item.id)}
                style={[styles.option, active ? styles.optionOn : null]}>
                <View style={[styles.radio, active ? styles.radioOn : null]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionNote}>{item.note}</Text>
                </View>
                <Text style={styles.optionPrice}>{money(item.price)}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, {marginTop: space.xxl}]}>
          Payment Method
        </Text>
        <View style={styles.options}>
          {payments.map(item => {
            const active = payment === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setPayment(item.id)}
                style={[styles.option, active ? styles.optionOn : null]}>
                <View style={[styles.radio, active ? styles.radioOn : null]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
                <View style={styles.payIcon}>
                  <Icon name={item.icon} size={17} color={colors.inkSoft} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionNote}>{item.note}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryHead}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <Text style={styles.itemCount}>{cartCount} items</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowValue}>{money(subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery</Text>
            <Text style={styles.rowValue}>{money(fee)}</Text>
          </View>
          <Divider style={{marginVertical: 12}} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{money(total)}</Text>
          </View>
        </View>

        <View style={styles.secure}>
          <Icon name="lock" size={14} color={colors.muted} />
          <Text style={styles.secureText}>Your payment is secure and encrypted</Text>
        </View>
      </ScrollView>

      <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 12)}]}>
        <View>
          <Text style={styles.barLabel}>Total</Text>
          <Text style={styles.barTotal}>{money(total)}</Text>
        </View>
        <Button
          label="Place Order"
          onPress={placeOrder}
          style={{flex: 1, marginLeft: 16}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  scroll: {paddingHorizontal: space.xl, paddingTop: space.sm},
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: space.md,
  },
  sectionTitle: {...text.title, fontSize: 14.5},
  link: {fontSize: 12.5, fontWeight: '700', color: colors.primary},

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  addressIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressName: {fontSize: 13.5, fontWeight: '700', color: colors.ink},
  addressBody: {fontSize: 12, fontWeight: '500', color: colors.muted, marginTop: 2},

  options: {gap: 10},
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  optionOn: {borderColor: colors.primary, backgroundColor: colors.primaryFaint},
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.6,
    borderColor: colors.faint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {borderColor: colors.primary},
  radioDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary},
  payIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {fontSize: 13.5, fontWeight: '700', color: colors.ink},
  optionNote: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 2},
  optionPrice: {fontSize: 12.5, fontWeight: '800', color: colors.ink},

  summary: {
    marginTop: space.xxl,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemCount: {fontSize: 11.5, fontWeight: '600', color: colors.muted},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.xl,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    ...shadow.bar,
  },
  barLabel: {fontSize: 11, fontWeight: '600', color: colors.muted},
  barTotal: {fontSize: 18, fontWeight: '800', color: colors.ink, letterSpacing: -0.4},
});
