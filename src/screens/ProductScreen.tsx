import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {Badge, Button, IconButton, Rating} from '../components/ui';
import {byId, money} from '../data';
import {useNav, useRoute} from '../nav';
import {useStore} from '../store';
import {colors, radius, shadow, space, text} from '../theme';

export function ProductScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const {params} = useRoute<{id: string}>();
  const {addToCart, isWished, toggleWish} = useStore();

  const product = byId(params?.id ?? 'jordan-4');
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState<number | undefined>(
    product.sizes.length ? product.sizes[3] ?? product.sizes[0] : undefined,
  );
  const [shot, setShot] = useState(0);
  const [added, setAdded] = useState(false);

  const toast = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const add = () => {
    addToCart(product, {size, color});
    setAdded(true);
    Animated.timing(toast, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      Animated.timing(toast, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAdded(false));
    }, 2400);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 130 + insets.bottom}}>
        <View style={[styles.hero, {height: width * 0.98}]}>
          <Image
            source={product.gallery[shot] ?? product.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroFade} />
        </View>

        <View style={styles.sheet}>
          <View style={styles.thumbs}>
            {product.gallery.map((item, index) => (
              <Pressable
                key={`${product.id}-${index}`}
                onPress={() => setShot(index)}
                style={[
                  styles.thumb,
                  shot === index ? styles.thumbOn : null,
                ]}>
                <Image source={item} style={styles.thumbImage} resizeMode="cover" />
              </Pressable>
            ))}
          </View>

          <View style={styles.titleRow}>
            <View style={{flex: 1}}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.name}>{product.name}</Text>
            </View>
            <Rating value={product.rating} count={product.reviews} size={12} />
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{money(product.price)}</Text>
            {product.oldPrice ? (
              <Text style={styles.oldPrice}>{money(product.oldPrice)}</Text>
            ) : null}
            {discount > 0 ? <Badge label={`${discount}% OFF`} tone="danger" /> : null}
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockDot} />
            <Text style={styles.stock}>In stock — ships in 24 hours</Text>
          </View>

          {product.colors.length ? (
            <>
              <View style={styles.groupHead}>
                <Text style={styles.groupLabel}>
                  Color: <Text style={styles.groupValue}>{color}</Text>
                </Text>
              </View>
              <View style={styles.swatches}>
                {product.colors.map(item => {
                  const active = color === item.name;
                  return (
                    <Pressable
                      key={item.name}
                      onPress={() => setColor(item.name)}
                      style={[styles.swatchRing, active ? styles.swatchRingOn : null]}>
                      <View style={[styles.swatch, {backgroundColor: item.hex}]} />
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : null}

          {product.sizes.length ? (
            <>
              <View style={styles.groupHead}>
                <Text style={styles.groupLabel}>Size</Text>
                <Pressable hitSlop={8}>
                  <Text style={styles.sizeGuide}>Size guide</Text>
                </Pressable>
              </View>
              <View style={styles.sizes}>
                {product.sizes.map(item => {
                  const active = size === item;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setSize(item)}
                      style={[styles.size, active ? styles.sizeOn : null]}>
                      <Text
                        style={[
                          styles.sizeText,
                          {color: active ? colors.white : colors.inkSoft},
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : null}

          <Text style={[styles.groupLabel, {marginTop: space.xxl}]}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.perks}>
            <View style={styles.perk}>
              <Icon name="truck" size={19} color={colors.primary} />
              <View style={{flex: 1}}>
                <Text style={styles.perkTitle}>Free delivery</Text>
                <Text style={styles.perkBody}>In Kampala, 1–3 business days</Text>
              </View>
            </View>
            <View style={styles.perk}>
              <Icon name="shield" size={19} color={colors.primary} />
              <View style={{flex: 1}}>
                <Text style={styles.perkTitle}>Buyer protection</Text>
                <Text style={styles.perkBody}>Free returns within 7 days</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.header, {top: insets.top + 6}]}>
        <IconButton name="chevronLeft" onPress={nav.pop} />
        <View style={styles.headerRight}>
          <IconButton name="share" onPress={() => {}} />
          <IconButton
            name="heart"
            onPress={() => toggleWish(product.id)}
            color={isWished(product.id) ? colors.primary : colors.ink}
          />
        </View>
      </View>

      {added ? (
        <Animated.View
          style={[
            styles.toast,
            {
              bottom: 96 + insets.bottom,
              opacity: toast,
              transform: [
                {
                  translateY: toast.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.toastIcon}>
            <Icon name="check" size={13} color={colors.white} />
          </View>
          <Text style={styles.toastText}>Added to cart</Text>
          <Pressable onPress={() => nav.push('Cart')} hitSlop={8}>
            <Text style={styles.toastLink}>View Cart</Text>
          </Pressable>
        </Animated.View>
      ) : null}

      <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 12)}]}>
        <Pressable
          style={styles.wishBtn}
          onPress={() => toggleWish(product.id)}>
          <Icon
            name="heart"
            size={22}
            color={isWished(product.id) ? colors.primary : colors.ink}
          />
        </Pressable>
        <Button label="Add to Cart" onPress={add} style={{flex: 1}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  hero: {backgroundColor: colors.surface},
  heroImage: {width: '100%', height: '100%'},
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  header: {
    position: 'absolute',
    left: space.lg,
    right: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRight: {flexDirection: 'row', gap: 10},

  sheet: {
    marginTop: -28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    paddingHorizontal: space.xl,
    paddingTop: space.lg,
    paddingBottom: space.xxl,
  },
  thumbs: {flexDirection: 'row', gap: 10, marginBottom: space.xl},
  thumb: {
    width: 62,
    height: 62,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: colors.surface,
  },
  thumbOn: {borderColor: colors.primary},
  thumbImage: {width: '100%', height: '100%'},

  titleRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 12},
  brand: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  name: {
    marginTop: 4,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: space.md,
  },
  price: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  oldPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.faint,
    textDecorationLine: 'line-through',
  },
  stockRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8},
  stockDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success},
  stock: {fontSize: 12, fontWeight: '600', color: colors.success},

  groupHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.xxl,
    marginBottom: space.md,
  },
  groupLabel: {...text.title, fontSize: 14, color: colors.ink},
  groupValue: {color: colors.muted, fontWeight: '600'},
  swatches: {flexDirection: 'row', gap: 10},
  swatchRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchRingOn: {borderColor: colors.ink},
  swatch: {width: 28, height: 28, borderRadius: 14},

  sizeGuide: {fontSize: 12, fontWeight: '700', color: colors.primary},
  sizes: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  size: {
    minWidth: 54,
    height: 46,
    paddingHorizontal: 12,
    borderRadius: radius.sm + 2,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeOn: {backgroundColor: colors.ink, borderColor: colors.ink},
  sizeText: {fontSize: 13.5, fontWeight: '700'},

  description: {
    ...text.bodySm,
    marginTop: space.md,
    color: colors.muted,
    lineHeight: 21,
  },

  perks: {
    marginTop: space.xxl,
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  perk: {flexDirection: 'row', alignItems: 'center', gap: 12},
  perkTitle: {fontSize: 13, fontWeight: '700', color: colors.ink},
  perkBody: {fontSize: 11.5, fontWeight: '500', color: colors.muted, marginTop: 1},

  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: space.xl,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    ...shadow.bar,
  },
  wishBtn: {
    width: 56,
    height: 56,
    borderRadius: radius.md + 2,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    position: 'absolute',
    left: space.xl,
    right: space.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.dark,
    ...shadow.card,
  },
  toastIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {flex: 1, fontSize: 13, fontWeight: '600', color: colors.white},
  toastLink: {fontSize: 12.5, fontWeight: '800', color: colors.primary},
});
