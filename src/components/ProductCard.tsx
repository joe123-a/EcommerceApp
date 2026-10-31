import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Product, money} from '../data';
import {colors, radius, shadow, text} from '../theme';
import {Icon} from './Icon';
import {Rating} from './ui';

export function ProductCard({
  product,
  width,
  onPress,
  onWish,
  wished,
  style,
}: {
  product: Product;
  width: number;
  onPress?: () => void;
  onWish?: () => void;
  wished?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{width, opacity: pressed ? 0.92 : 1}, style]}>
      <View style={[styles.media, {height: width}]}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />

        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <Pressable onPress={onWish} hitSlop={6} style={styles.wish}>
          <Icon
            name="heart"
            size={15}
            color={wished ? colors.primary : colors.faint}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text style={styles.price}>{money(product.price)}</Text>
        <Rating value={product.rating} count={product.reviews} size={11} style={{marginTop: 4}} />
      </View>
    </Pressable>
  );
}

export function MiniProductCard({
  product,
  width = 150,
  onPress,
  onWish,
  wished,
}: {
  product: Product;
  width?: number;
  onPress?: () => void;
  onWish?: () => void;
  wished?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={{width}}>
      <View style={[styles.media, {height: width, borderRadius: radius.lg}]}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        <Pressable onPress={onWish} hitSlop={6} style={styles.wish}>
          <Icon
            name="heart"
            size={13}
            color={wished ? colors.primary : colors.faint}
          />
        </Pressable>
      </View>
      <Text numberOfLines={1} style={[styles.name, {marginTop: 8}]}>
        {product.name}
      </Text>
      <Text style={styles.price}>{money(product.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  media: {
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: {width: '100%', height: '100%'},
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 24,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.2,
  },
  wish: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  info: {paddingTop: 10, paddingHorizontal: 2},
  name: {...text.bodySm, fontSize: 13.5, fontWeight: '700', color: colors.ink},
  price: {...text.price, fontSize: 14, marginTop: 3},
});
