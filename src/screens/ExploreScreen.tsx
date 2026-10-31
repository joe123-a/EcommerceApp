import React, {useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {Icon} from '../components/Icon';
import {ProductCard} from '../components/ProductCard';
import {TabLayout} from '../components/BottomTabBar';
import {Button, Chip, Divider} from '../components/ui';
import {money, products} from '../data';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, radius, space, text} from '../theme';

const PAD = space.xl;
const BRANDS = ['Nike', 'Jordan', 'New Balance', 'Puma', 'Vans', 'Sony'];
const PRICES = [
  {label: 'Under 400K', max: 400000},
  {label: '400K – 600K', max: 600000},
  {label: '600K – 1M', max: 1000000},
  {label: 'Above 1M', max: 3000000},
];
const SORTS = ['Newest First', 'Price: Low to High', 'Price: High to Low'];

export function ExploreScreen() {
  const nav = useNav();
  const {width} = useWindowDimensions();
  const {isWished, toggleWish} = useStore();
  const cardWidth = (width - PAD * 2 - 14) / 2;

  const [brand, setBrand] = useState('All');
  const [sort, setSort] = useState(0);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [sheet, setSheet] = useState(false);

  const [draftBrands, setDraftBrands] = useState<string[]>([]);
  const [draftPrice, setDraftPrice] = useState<number | null>(null);
  const [draftSize, setDraftSize] = useState<number | null>(null);

  const [applied, setApplied] = useState<{
    brands: string[];
    price: number | null;
    size: number | null;
  }>({brands: [], price: null, size: null});

  const activeFilters =
    applied.brands.length + (applied.price ? 1 : 0) + (applied.size ? 1 : 0);

  const list = useMemo(() => {
    let next = products.filter(product => {
      if (brand !== 'All' && product.brand !== brand) {
        return false;
      }
      if (applied.brands.length && !applied.brands.includes(product.brand)) {
        return false;
      }
      if (applied.price && product.price > applied.price) {
        return false;
      }
      if (applied.size && !product.sizes.includes(applied.size)) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !product.name.toLowerCase().includes(q) &&
          !product.brand.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    if (sort === 1) {
      next = [...next].sort((a, b) => a.price - b.price);
    } else if (sort === 2) {
      next = [...next].sort((a, b) => b.price - a.price);
    }
    return next;
  }, [brand, applied, query, sort]);

  const openSheet = () => {
    setDraftBrands(applied.brands);
    setDraftPrice(applied.price);
    setDraftSize(applied.size);
    setSheet(true);
  };

  const toggleDraftBrand = (value: string) =>
    setDraftBrands(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value],
    );

  const apply = () => {
    setApplied({brands: draftBrands, price: draftPrice, size: draftSize});
    setSheet(false);
  };

  return (
    <TabLayout active="Explore">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={{width: 42}} />
        <Text style={text.title}>Sneakers</Text>
        <Pressable
          onPress={() => setSearching(v => !v)}
          style={styles.headerBtn}>
          <Icon name="search" size={19} color={colors.ink} />
        </Pressable>
      </View>

      {searching ? (
        <View style={styles.searchWrap}>
          <View style={styles.search}>
            <Icon name="search" size={17} color={colors.muted} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Search sneakers…"
              placeholderTextColor={colors.faint}
              style={styles.searchInput}
            />
            {query ? (
              <Pressable onPress={() => setQuery('')} hitSlop={8}>
                <Icon name="close" size={15} color={colors.muted} />
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.toolbar}>
          <Pressable
            style={styles.sortBtn}
            onPress={() => setSort(prev => (prev + 1) % SORTS.length)}>
            <View>
              <Text style={styles.sortLabel}>Sort by</Text>
              <View style={styles.sortValueRow}>
                <Text style={styles.sortValue}>{SORTS[sort]}</Text>
                <Icon name="chevronDown" size={12} color={colors.ink} />
              </View>
            </View>
          </Pressable>

          <Pressable
            style={[styles.filterBtn, activeFilters ? styles.filterBtnOn : null]}
            onPress={openSheet}>
            <Icon
              name="filter"
              size={17}
              color={activeFilters ? colors.white : colors.ink}
            />
            <Text
              style={[
                styles.filterText,
                {color: activeFilters ? colors.white : colors.ink},
              ]}>
              Filter{activeFilters ? ` (${activeFilters})` : ''}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}>
          {['All', ...BRANDS.slice(0, 5)].map(item => (
            <Chip
              key={item}
              label={item}
              active={brand === item}
              onPress={() => setBrand(item)}
            />
          ))}
        </ScrollView>

        <View style={styles.countRow}>
          <Text style={styles.count}>
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </Text>
          <Text style={styles.countHint}>Free delivery over {money(300000)}</Text>
        </View>

        <View style={styles.grid}>
          {list.map(product => (
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

        {list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={text.h3}>Nothing matches yet</Text>
            <Text style={[text.bodySm, {color: colors.muted, marginTop: 6}]}>
              Try removing a filter or searching for something else.
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <Modal visible={sheet} transparent animationType="slide" onRequestClose={() => setSheet(false)}>
        <View style={styles.backdrop}>
          <Pressable style={{flex: 1}} onPress={() => setSheet(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHead}>
              <Text style={text.h2}>Filters</Text>
              <Pressable onPress={() => setSheet(false)} hitSlop={8}>
                <Icon name="close" size={20} color={colors.ink} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.groupLabel}>Brand</Text>
              <View style={styles.wrapRow}>
                {BRANDS.map(item => (
                  <Chip
                    key={item}
                    label={item}
                    active={draftBrands.includes(item)}
                    onPress={() => toggleDraftBrand(item)}
                  />
                ))}
              </View>

              <Divider style={{marginVertical: space.xl}} />

              <Text style={styles.groupLabel}>Price</Text>
              <View style={styles.wrapRow}>
                {PRICES.map(item => (
                  <Chip
                    key={item.label}
                    label={item.label}
                    active={draftPrice === item.max}
                    onPress={() =>
                      setDraftPrice(prev => (prev === item.max ? null : item.max))
                    }
                  />
                ))}
              </View>

              <Divider style={{marginVertical: space.xl}} />

              <Text style={styles.groupLabel}>Size</Text>
              <View style={styles.wrapRow}>
                {[6, 6.5, 7, 7.5, 8, 8.5, 9, 10, 11].map(size => (
                  <Pressable
                    key={size}
                    onPress={() =>
                      setDraftSize(prev => (prev === size ? null : size))
                    }
                    style={[
                      styles.size,
                      draftSize === size ? styles.sizeOn : null,
                    ]}>
                    <Text
                      style={[
                        styles.sizeText,
                        {color: draftSize === size ? colors.white : colors.inkSoft},
                      ]}>
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <View style={styles.sheetFooter}>
              <Button
                label="Reset"
                variant="outline"
                full={false}
                onPress={() => {
                  setDraftBrands([]);
                  setDraftPrice(null);
                  setDraftSize(null);
                  setApplied({brands: [], price: null, size: null});
                  setBrand('All');
                }}
                style={{flex: 1}}
              />
              <Button label="Apply Filters" onPress={apply} style={{flex: 1.6}} />
            </View>
          </View>
        </View>
      </Modal>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {paddingHorizontal: PAD, paddingBottom: space.md},
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  searchInput: {flex: 1, fontSize: 14, fontWeight: '500', color: colors.ink, padding: 0},
  scroll: {paddingBottom: space.xxl},
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingTop: space.xs,
  },
  sortBtn: {flexDirection: 'row', alignItems: 'center'},
  sortLabel: {fontSize: 11, fontWeight: '600', color: colors.muted},
  sortValueRow: {flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2},
  sortValue: {fontSize: 14, fontWeight: '700', color: colors.ink},
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    height: 42,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterBtnOn: {backgroundColor: colors.primary, borderColor: colors.primary},
  filterText: {fontSize: 13, fontWeight: '700'},
  chips: {paddingHorizontal: PAD, gap: 8, paddingTop: space.lg, paddingBottom: space.md},
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    marginBottom: space.md,
  },
  count: {fontSize: 12, fontWeight: '700', color: colors.inkSoft},
  countHint: {fontSize: 11, fontWeight: '500', color: colors.faint},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.xl,
    paddingHorizontal: PAD,
  },
  empty: {alignItems: 'center', paddingVertical: 60, paddingHorizontal: 40},
  backdrop: {flex: 1, backgroundColor: 'rgba(14,17,22,0.45)'},
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: PAD,
    paddingTop: 10,
    paddingBottom: 28,
    maxHeight: '82%',
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginBottom: 16,
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: space.xl,
  },
  groupLabel: {...text.title, fontSize: 14, marginBottom: space.md},
  wrapRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  size: {
    width: 52,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeOn: {backgroundColor: colors.ink, borderColor: colors.ink},
  sizeText: {fontSize: 13, fontWeight: '700'},
  sheetFooter: {flexDirection: 'row', gap: 12, marginTop: space.xl},
});
