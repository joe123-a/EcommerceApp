# ShopPlus

A complete e-commerce app UI for the Ugandan market — built with React Native
(0.88), TypeScript and **zero UI dependencies**.

Every screen, icon, shadow and transition is hand-built from core React Native
primitives, so the app has no icon fonts, no native SVG, and no navigation
library to link. Product photography is bundled locally, so the app looks the
same offline.

## Screens

| # | Screen | File |
|---|--------|------|
| 1 | Splash | `src/screens/SplashScreen.tsx` |
| 2–4 | Onboarding (3 steps) | `src/screens/OnboardingScreen.tsx` |
| 5 | Login | `src/screens/LoginScreen.tsx` |
| 6 | Sign Up | `src/screens/SignUpScreen.tsx` |
| 7 | Home | `src/screens/HomeScreen.tsx` |
| 8 | Category results + filters | `src/screens/ExploreScreen.tsx` |
| 9 | Product details | `src/screens/ProductScreen.tsx` |
| 10 | Wishlist | `src/screens/WishlistScreen.tsx` |
| 11 | Cart | `src/screens/CartScreen.tsx` |
| 12 | Checkout | `src/screens/CheckoutScreen.tsx` |
| 13 | Mobile Money | `src/screens/MobileMoneyScreen.tsx` |
| 14 | Profile & orders | `src/screens/ProfileScreen.tsx` |
| 15 | Order history | `src/screens/OrdersScreen.tsx` |
| 16 | Order confirmation | `src/screens/SuccessScreen.tsx` |

## Design system

`src/theme.ts` holds every token: colour, type scale, spacing, radii and
elevation. Change `colors.primary` once and the whole app re-themes.

- **Primary** `#FF6A2B` — warm orange, tuned for the Ugandan retail market
- **Ink** `#0E1116` — near-black type
- **Surface** `#F6F7F9` — cards and fields
- Type scale `display → h1 → h2 → h3 → title → body → label → tiny`
- Radii `10 / 14 / 18 / 22 / 28 / pill`

Reusable pieces live in `src/components`:

- `Icon.tsx` — 30 line icons drawn on a 24×24 grid from Views
- `ui.tsx` — Button, IconButton, AppBar, Field, Chip, Badge, Rating,
  SectionHeader, Stepper, Avatar, EmptyState
- `ProductCard.tsx` — grid and rail cards
- `BottomTabBar.tsx` — 5-tab bar with live cart/wishlist badges

## Architecture

- **Navigation** — a small stack + tab router (`src/nav.ts`,
  `src/Navigator.tsx`) with a fade/slide transition. No native modules.
- **State** — `src/store.tsx` (React context) holds the cart, wishlist and
  session. Prices are in UGX.
- **Data** — `src/data.ts` (12 products, categories, orders).

Demo flows that work end to end: browse → filter → product → add to cart →
promo code `SHOP10` → checkout → Mobile Money → confirmation.

## Run

```bash
npm install
npm start            # Metro
npm run ios          # or: npm run android
```

The splash screen advances automatically after ~2 seconds. Log in with any
credentials (the form is pre-filled).
