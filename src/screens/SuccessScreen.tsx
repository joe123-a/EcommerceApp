import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {Button, Divider} from '../components/ui';
import {money} from '../data';
import {useNav, useRoute} from '../nav';
import {useStore} from '../store';
import {colors, radius, space, text} from '../theme';

export function SuccessScreen() {
  const nav = useNav();
  const {params} = useRoute<{total?: number; payment?: string; provider?: string}>();
  const {clearCart} = useStore();
  const total = params?.total ?? 1665000;

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentLabel =
    params?.payment === 'momo'
      ? params?.provider === 'airtel'
        ? 'Airtel Money'
        : 'MTN Mobile Money'
      : params?.payment === 'card'
      ? 'Credit / Debit Card'
      : 'Cash on Delivery';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.ring}>
          <View style={styles.circle}>
            <Icon name="check" size={40} color={colors.white} />
          </View>
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.body}>
          Thank you, Joel. Your order is confirmed and on its way to Kira Road,
          Kampala.
        </Text>

        <View style={styles.card}>
          <Row label="Order ID" value="#SP123456" />
          <Divider style={{marginVertical: 10}} />
          <Row label="Payment" value={paymentLabel} />
          <Divider style={{marginVertical: 10}} />
          <Row label="Delivery" value="3–5 business days" />
          <Divider style={{marginVertical: 10}} />
          <View style={styles.row}>
            <Text style={styles.label}>Total paid</Text>
            <Text style={styles.total}>{money(total)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Track My Order"
            onPress={() => nav.switchTab('Orders')}
          />
          <Button
            label="Continue Shopping"
            variant="outline"
            onPress={() => nav.switchTab('Home')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function Row({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  safe: {flex: 1, paddingHorizontal: space.xxl, alignItems: 'center'},
  ring: {
    marginTop: 56,
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: space.xxl,
    fontSize: 28,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.8,
  },
  body: {
    ...text.bodySm,
    marginTop: 10,
    textAlign: 'center',
    color: colors.muted,
    lineHeight: 20,
    maxWidth: 300,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: space.xxl,
    padding: 18,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {fontSize: 12.5, fontWeight: '500', color: colors.muted},
  value: {fontSize: 12.5, fontWeight: '700', color: colors.ink},
  total: {fontSize: 16, fontWeight: '800', color: colors.ink, letterSpacing: -0.3},
  footer: {
    alignSelf: 'stretch',
    marginTop: 'auto',
    gap: 12,
    paddingBottom: space.xxl,
  },
});
