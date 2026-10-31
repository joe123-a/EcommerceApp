import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {img} from '../assets';
import {Icon} from '../components/Icon';
import {ProductCard, MiniProductCard} from '../components/ProductCard';
import {TabLayout} from '../components/BottomTabBar';
import {Badge, SectionHeader} from '../components/ui';
import {categories, money, products} from '../data';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, radius, shadow, space, text} from '../theme';

const PAD = space.xl;

export function HomeScreen() {
  const nav = useNav();
  const {width} = useWindowDimensions();
  const {isWished, toggleWish} = useStore();
  const cardWidth = (width - PAD * 2 - 14) / 2;

  const bestSellers = products.slice(0, 4);
  const fresh = products.slice(3, 8);

  return (
    <TabLayout active="Home">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.location}>
            <View style={styles.pinWrap}>
              <Icon name="pin" size={15} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.city}>Kampala, Uganda</Text>
              <View style={styles.deliverRow}>
                <Text style={styles.deliver}>Deliver to your location</Text>
                <Icon name="chevronDown" size={12} color={colors.muted} />
              </View>
            </View>
          </View>

          <Pressable style={styles.bellWrap} onPress={() => nav.push('Orders')}>
            <Icon name="bell" size={20} color={colors.ink} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        <Pressable
          style={styles.search}
          onPress={() => nav.switchTab('Explore')}>
          <Icon name="search" size={19} color={colors.muted} />
          <Text style={styles.searchText}>Search for products, brands…</Text>
          <View style={styles.searchAction}>
            <Icon name="filter" size={17} color={colors.white} />
          </View>
        </Pressable>

        <Pressable style={styles.banner} onPress={() => nav.push('Product', {id: 'jordan-4'})}>
          <View style={styles.glow} />
          <View style={styles.bannerCopy}>
            <View style={styles.limitedRow}>
              <View style={styles.limitedDot} />
              <Text style={styles.limited}>Limited Edition</Text>
            </View>
            <Text style={styles.bannerTitle}>Air Jordan 4</Text>
            <Text style={styles.bannerSub}>Up to 50% Off</Text>
            <View style={styles.shopNow}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </View>
          </View>
          <Image source={img.whiteForce} style={styles.bannerImage} resizeMode="cover" />
        </Pressable>

        <View style={styles.section}>
          <SectionHeader
            title="Shop by Category"
            action="See All"
            onPress={() => nav.switchTab('Explore')}
          />
          <View style={styles.categories}>
            {categories.map(category => (
              <Pressable
                key={category.name}
                style={styles.category}
                onPress={() => nav.switchTab('Explore')}>
                <View style={styles.categoryCircle}>
                  <Image
                    source={category.image}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Best Sellers"
            action="See All"
            onPress={() => nav.switchTab('Explore')}
          />
          <View style={styles.grid}>
            {bestSellers.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                width={cardWidth}
                onPress={() => nav.push('Product', {id: product.id})}
                onWish={() => toggleWish(product.id)}
                wished={isWished(product.id)}
              />
            ))}
          </View>
        </View>

        <View style={[styles.section, {paddingHorizontal: 0}]}>
          <View style={{paddingHorizontal: PAD}}>
            <SectionHeader title="New Arrivals" action="See All" onPress={() => nav.switchTab('Explore')} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.freshRow}>
            {fresh.map(product => (
              <MiniProductCard
                key={product.id}
                product={product}
                onPress={() => nav.push('Product', {id: product.id})}
                onWish={() => toggleWish(product.id)}
                wished={isWished(product.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.promo}>
          <View style={styles.promoIcon}>
            <Icon name="truck" size={22} color={colors.primary} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.promoTitle}>Free delivery in Kampala</Text>
            <Text style={styles.promoBody}>On every order above {money(300000)}</Text>
          </View>
          <Badge label="Today" tone="primary" />
        </View>
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {paddingBottom: space.xxl},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingTop: space.sm,
    paddingBottom: space.lg,
  },
  location: {flexDirection: 'row', alignItems: 'center', gap: 10},
  pinWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {fontSize: 15, fontWeight: '800', color: colors.ink, letterSpacing: -0.2},
  deliverRow: {flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 1},
  deliver: {fontSize: 11.5, fontWeight: '500', color: colors.muted},
  bellWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  greeting: {
    ...text.bodySm,
    color: colors.muted,
    paddingHorizontal: PAD,
    marginTop: -6,
    marginBottom: space.md,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    marginHorizontal: PAD,
    paddingLeft: 16,
    paddingRight: 7,
    borderRadius: radius.md + 2,
    backgroundColor: colors.surface,
  },
  searchText: {flex: 1, ...text.bodySm, color: colors.faint},
  searchAction: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    marginHorizontal: PAD,
    marginTop: space.lg,
    height: 172,
    borderRadius: radius.xxl,
    backgroundColor: colors.dark,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  glow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -20,
    top: -40,
    backgroundColor: 'rgba(255,106,43,0.20)',
  },
  bannerCopy: {padding: 20, justifyContent: 'center', flex: 1},
  limitedRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  limitedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  limited: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.6,
  },
  bannerSub: {
    marginTop: 2,
    fontSize: 12.5,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.72)',
  },
  shopNow: {
    marginTop: 14,
    alignSelf: 'flex-start',
    height: 34,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopNowText: {fontSize: 12, fontWeight: '800', color: colors.white},
  bannerImage: {
    position: 'absolute',
    right: -14,
    bottom: -6,
    width: 178,
    height: 178,
    borderRadius: 24,
  },

  section: {paddingHorizontal: PAD, marginTop: space.xxl},
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: space.lg,
  },
  category: {alignItems: 'center', width: '24%'},
  categoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  categoryImage: {width: '100%', height: '100%'},
  categoryLabel: {
    marginTop: 9,
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.xl,
    marginTop: space.lg,
  },
  freshRow: {paddingHorizontal: PAD, gap: 14, paddingTop: space.lg},
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: PAD,
    marginTop: space.xxl,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryFaint,
    borderWidth: 1,
    borderColor: '#FCE3D6',
  },
  promoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  promoTitle: {fontSize: 13.5, fontWeight: '700', color: colors.ink},
  promoBody: {fontSize: 12, fontWeight: '500', color: colors.muted, marginTop: 2},
});
