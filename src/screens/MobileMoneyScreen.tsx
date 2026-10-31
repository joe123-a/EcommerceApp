import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {AppBar, Button, Field} from '../components/ui';
import {money} from '../data';
import {useNav, useRoute} from '../nav';
import {colors, radius, shadow, space, text} from '../theme';

const providers = [
  {id: 'mtn', name: 'MTN Mobile Money', short: 'MTN', bg: '#FFCC00', fg: '#1A1A1A'},
  {id: 'airtel', name: 'Airtel Money', short: 'Airtel', bg: '#E40000', fg: '#FFFFFF'},
];

export function MobileMoneyScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const {params} = useRoute<{total?: number}>();
  const [provider, setProvider] = useState('mtn');
  const [phone, setPhone] = useState('772 123 456');
  const [save, setSave] = useState(true);

  const total = params?.total ?? 1665000;

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <AppBar title="Mobile Money" onBack={nav.pop} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, {paddingBottom: 130 + insets.bottom}]}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to pay</Text>
          <Text style={styles.amount}>{money(total)}</Text>
          <View style={styles.refRow}>
            <Icon name="clock" size={13} color="rgba(255,255,255,0.8)" />
            <Text style={styles.ref}>Order #SP123456 · reserved for 15:00</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, {marginTop: space.xxl}]}>
          Select Provider
        </Text>
        <View style={styles.providers}>
          {providers.map(item => {
            const active = provider === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setProvider(item.id)}
                style={[
                  styles.provider,
                  {backgroundColor: item.bg},
                  active ? styles.providerOn : null,
                ]}>
                <View style={styles.providerTop}>
                  <View
                    style={[
                      styles.providerLogo,
                      {backgroundColor: item.id === 'mtn' ? '#1A1A1A' : '#FFFFFF'},
                    ]}>
                    <Text
                      style={[
                        styles.providerLogoText,
                        {color: item.id === 'mtn' ? '#FFCC00' : '#E40000'},
                      ]}>
                      {item.short.slice(0, 1)}
                    </Text>
                  </View>
                  {active ? (
                    <View style={styles.providerCheck}>
                      <Icon name="check" size={12} color={colors.white} />
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.providerName, {color: item.fg}]}>{item.short}</Text>
                <Text style={[styles.providerSub, {color: item.fg}]}>Mobile Money</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{marginTop: space.xxl}}>
          <Field
            label="Phone Number"
            icon="phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="772 123 456"
            right={<Text style={styles.prefix}>+256</Text>}
          />
          <Text style={styles.help}>
            You’ll receive a prompt on this number to approve the payment.
          </Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Amount</Text>
            <Text style={styles.rowValue}>{money(total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Transaction fee</Text>
            <Text style={[styles.rowValue, {color: colors.success}]}>Free</Text>
          </View>
        </View>

        <View style={styles.saveRow}>
          <View style={{flex: 1}}>
            <Text style={styles.saveTitle}>Save payment method</Text>
            <Text style={styles.saveBody}>For faster checkout next time</Text>
          </View>
          <Switch
            value={save}
            onValueChange={setSave}
            trackColor={{false: colors.line, true: colors.primary}}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.secure}>
          <Icon name="lock" size={14} color={colors.muted} />
          <Text style={styles.secureText}>
            Your payment is secure and encrypted. ShopPlus never stores your PIN.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 12)}]}>
        <Button
          label={`Pay ${money(total)}`}
          onPress={() =>
            nav.replace('Success', {total, payment: 'momo', provider})
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  scroll: {paddingHorizontal: space.xl, paddingTop: space.sm},

  amountCard: {
    padding: 20,
    borderRadius: radius.xl,
    backgroundColor: colors.dark,
    overflow: 'hidden',
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.2,
  },
  amount: {
    marginTop: 6,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.8,
  },
  refRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10},
  ref: {fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.72)'},

  sectionTitle: {...text.title, fontSize: 14.5},
  providers: {flexDirection: 'row', gap: 12, marginTop: space.md},
  provider: {
    flex: 1,
    height: 116,
    borderRadius: radius.lg,
    padding: 14,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  providerOn: {borderColor: colors.ink},
  providerTop: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  providerLogo: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogoText: {fontSize: 15, fontWeight: '800'},
  providerCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerName: {fontSize: 16, fontWeight: '800', letterSpacing: -0.3},
  providerSub: {fontSize: 10.5, fontWeight: '600', opacity: 0.7},

  prefix: {fontSize: 13, fontWeight: '700', color: colors.muted},
  help: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 10, lineHeight: 16},

  summary: {
    marginTop: space.xxl,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    gap: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  rowLabel: {fontSize: 13, fontWeight: '500', color: colors.muted},
  rowValue: {fontSize: 13, fontWeight: '700', color: colors.ink},

  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: space.xl,
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  saveTitle: {fontSize: 13.5, fontWeight: '700', color: colors.ink},
  saveBody: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 2},

  secure: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: space.xl,
    paddingHorizontal: 4,
  },
  secureText: {flex: 1, fontSize: 11, fontWeight: '500', color: colors.muted, lineHeight: 16},

  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space.xl,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    ...shadow.bar,
  },
});
