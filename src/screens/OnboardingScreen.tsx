import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {img} from '../assets';
import {Icon} from '../components/Icon';
import {Button} from '../components/ui';
import {useNav} from '../nav';
import {colors, radius, shadow, space, text} from '../theme';

type Step = 1 | 2 | 3;

const content: Record<
  Step,
  {title: string; body: string; cta: string; next: 'Onboarding2' | 'Onboarding3' | 'Login'}
> = {
  1: {
    title: 'Top Brands\nBest Prices',
    body: 'Get your favorite products delivered straight to your door.',
    cta: 'Next',
    next: 'Onboarding2',
  },
  2: {
    title: 'Fast & Reliable\nDelivery',
    body: 'We deliver your orders safely and on time, anywhere in Uganda.',
    cta: 'Next',
    next: 'Onboarding3',
  },
  3: {
    title: 'Secure\nPayments',
    body: 'Pay easily with Mobile Money, cards and more — always protected.',
    cta: 'Get Started',
    next: 'Login',
  },
};

export function OnboardingScreen({step}: {step: Step}) {
  const nav = useNav();
  const item = content[step];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Pressable onPress={() => nav.replace('Login')} hitSlop={12}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </View>

        <View style={styles.artWrap}>
          {step === 1 ? <ShoeArt /> : null}
          {step === 2 ? <DeliveryArt /> : null}
          {step === 3 ? <PaymentArt /> : null}
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {[1, 2, 3].map(dot => (
              <View
                key={dot}
                style={[styles.dot, dot === step ? styles.dotActive : null]}
              />
            ))}
          </View>

          <Button
            label={item.cta}
            onPress={() => nav.replace(item.next)}
            icon={<Icon name="arrowRight" size={20} color={colors.white} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function ShoeArt() {
  return (
    <View style={styles.artCircle}>
      <View style={styles.photoClip}>
        <Image source={img.airMax} style={styles.photo} resizeMode="cover" />
      </View>
      <View style={[styles.floatChip, styles.floatChipTop]}>
        <Icon name="star" size={14} color={colors.star} />
        <Text style={styles.floatChipText}>4.9 rating</Text>
      </View>
      <View style={[styles.floatChip, styles.floatChipBottom]}>
        <Text style={styles.floatChipText}>Free delivery</Text>
      </View>
    </View>
  );
}

function DeliveryArt() {
  return (
    <View style={styles.artCircle}>
      <View style={styles.photoClip}>
        <Image source={img.courier} style={styles.photo} resizeMode="cover" />
      </View>
      <View style={[styles.floatChip, styles.floatChipTop]}>
        <View style={styles.liveDot} />
        <Text style={styles.floatChipText}>On the way</Text>
      </View>
      <View style={[styles.badgeCircle, styles.floatChipBottom]}>
        <Icon name="truck" size={22} color={colors.primary} />
      </View>
    </View>
  );
}

function PaymentArt() {
  return (
    <View style={styles.artCircle}>
      <View style={[styles.card, styles.cardBack]}>
        <View style={styles.cardRow}>
          <Text style={styles.cardBrand}>VISA</Text>
          <View style={styles.cardChip} />
        </View>
        <Text style={styles.cardNumber}>•••• 4821</Text>
      </View>

      <View style={[styles.card, styles.cardFront]}>
        <View style={styles.cardRow}>
          <View style={styles.cardChip} />
          <Icon name="wallet" size={20} color="rgba(255,255,255,0.9)" />
        </View>
        <Text style={[styles.cardNumber, {color: colors.white}]}>•••• 6390</Text>
        <Text style={styles.cardHolder}>MUGAMBA JOEL</Text>
      </View>

      <View style={[styles.badgeCircle, styles.floatChipTop]}>
        <Icon name="shield" size={22} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  safe: {flex: 1, paddingHorizontal: space.xxl},
  topBar: {height: 44, alignItems: 'flex-end', justifyContent: 'center'},
  skip: {...text.bodySm, color: colors.muted, fontWeight: '600'},

  artWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  artCircle: {
    width: 286,
    height: 286,
    borderRadius: 143,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoClip: {
    width: 218,
    height: 218,
    borderRadius: 109,
    overflow: 'hidden',
  },
  photo: {width: '100%', height: '100%'},

  floatChip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: radius.pill,
    ...shadow.card,
  },
  floatChipTop: {top: 26, right: 6},
  floatChipBottom: {bottom: 24, left: 0},
  floatChipText: {fontSize: 12, fontWeight: '700', color: colors.ink},
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  badgeCircle: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },

  card: {
    position: 'absolute',
    width: 196,
    height: 122,
    borderRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardBack: {
    backgroundColor: colors.white,
    transform: [{rotate: '-9deg'}],
    top: 74,
    left: 34,
    ...shadow.card,
  },
  cardFront: {
    backgroundColor: colors.primary,
    transform: [{rotate: '7deg'}],
    top: 92,
    left: 56,
    ...shadow.button,
  },
  cardRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  cardBrand: {fontSize: 16, fontWeight: '800', color: colors.ink, letterSpacing: 0.5},
  cardChip: {
    width: 26,
    height: 19,
    borderRadius: 5,
    backgroundColor: '#E7C97E',
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.inkSoft,
  },
  cardHolder: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.85)',
  },

  copy: {marginBottom: space.xl},
  title: {
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '800',
    letterSpacing: -0.9,
    color: colors.ink,
  },
  body: {
    ...text.body,
    marginTop: 12,
    color: colors.muted,
    lineHeight: 23,
    maxWidth: 320,
  },

  footer: {paddingBottom: space.xxl},
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: space.xl,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.line,
  },
  dotActive: {width: 24, backgroundColor: colors.primary},
});
