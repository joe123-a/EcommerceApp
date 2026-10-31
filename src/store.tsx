import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Product, byId} from './data';

export const DELIVERY_FEE = 15000;

export type CartLine = {
  key: string;
  product: Product;
  qty: number;
  size?: number;
  color?: string;
};

type StoreValue = {
  cart: CartLine[];
  addToCart: (
    product: Product,
    opts?: {size?: number; color?: string; qty?: number},
  ) => void;
  removeLine: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<CartLine[]>([
    {
      key: 'jordan-4-7-White',
      product: byId('jordan-4'),
      qty: 1,
      size: 7,
      color: 'White',
    },
    {
      key: 'sony-xm5-Black',
      product: byId('sony-xm5'),
      qty: 1,
      color: 'Black',
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([
    'air-force-1',
    'jordan-1-high',
    'sony-xm5',
  ]);
  const [signedIn, setSignedIn] = useState(false);

  const addToCart = useCallback<StoreValue['addToCart']>((product, opts) => {
    const size = opts?.size;
    const color = opts?.color;
    const qty = opts?.qty ?? 1;
    const key = `${product.id}-${size ?? 'os'}-${color ?? 'default'}`;

    setCart(prev => {
      const found = prev.find(line => line.key === key);
      if (found) {
        return prev.map(line =>
          line.key === key ? {...line, qty: line.qty + qty} : line,
        );
      }
      return [...prev, {key, product, qty, size, color}];
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart(prev => prev.filter(line => line.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart(prev =>
      prev.map(line => (line.key === key ? {...line, qty: Math.max(1, qty)} : line)),
    );
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.qty, 0);

    return {
      cart,
      addToCart,
      removeLine,
      setQty,
      clearCart: () => setCart([]),
      cartCount,
      subtotal,
      wishlist,
      toggleWish,
      isWished: (id: string) => wishlist.includes(id),
      signedIn,
      signIn: () => setSignedIn(true),
      signOut: () => setSignedIn(false),
    };
  }, [cart, wishlist, signedIn, addToCart, removeLine, setQty, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return value;
}
