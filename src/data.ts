import {img} from './assets';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: any;
  gallery: any[];
  category: 'Sneakers' | 'Men' | 'Women' | 'Accessories';
  badge?: string;
  colors: {name: string; hex: string}[];
  sizes: number[];
  description: string;
};

export const money = (value: number) =>
  'UGX ' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const categories = [
  {name: 'Sneakers', image: img.sneakersOnFeet},
  {name: 'Men', image: img.manTee},
  {name: 'Women', image: img.womanRed},
  {name: 'Accessories', image: img.watch},
];

export const products: Product[] = [
  {
    id: 'air-force-1',
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: 450000,
    rating: 4.8,
    reviews: 124,
    image: img.whiteForce,
    gallery: [img.whiteForce, img.whiteJordanPair, img.pastelLow, img.tanForce],
    category: 'Sneakers',
    badge: 'Best seller',
    colors: [
      {name: 'White', hex: '#F4F4F2'},
      {name: 'Black', hex: '#1C1C1E'},
      {name: 'Grey', hex: '#B9BCC2'},
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    description:
      'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best. Crisp leather, bold colours and the right amount of shine keep this icon fresh.',
  },
  {
    id: 'air-max-270',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 520000,
    oldPrice: 610000,
    rating: 4.7,
    reviews: 98,
    image: img.airMax,
    gallery: [img.airMax, img.redRunner, img.greenRunner, img.oliveRunner],
    category: 'Sneakers',
    colors: [
      {name: 'Sail', hex: '#F2EDE4'},
      {name: 'Orange', hex: '#FF6A2B'},
      {name: 'Black', hex: '#1C1C1E'},
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 10],
    description:
      'Nike’s first lifestyle Air Max brings you style, comfort and big attitude. The Air Max 270 draws inspiration from the Air Max 93 and Air Max 180 with a silhouette that is light, airy and undeniably modern.',
  },
  {
    id: 'jordan-1-high',
    name: 'Jordan 1 Retro High',
    brand: 'Jordan',
    price: 620000,
    rating: 4.8,
    reviews: 112,
    image: img.tanJordan,
    gallery: [img.tanJordan, img.jordanHanging, img.jordanCourt, img.orangeJordan],
    category: 'Sneakers',
    colors: [
      {name: 'Tan', hex: '#D8B98E'},
      {name: 'Sail', hex: '#F2EDE4'},
      {name: 'Black', hex: '#1C1C1E'},
    ],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 10],
    description:
      'Familiar but always fresh, the iconic Air Jordan 1 is remastered for today’s sneaker culture with premium materials, a high-cut collar and the classic Wings logo.',
  },
  {
    id: 'dunk-low',
    name: 'Nike Dunk Low',
    brand: 'Nike',
    price: 480000,
    oldPrice: 560000,
    rating: 4.6,
    reviews: 86,
    image: img.pastelLow,
    gallery: [img.pastelLow, img.whiteForce, img.blueJordan, img.burgundy],
    category: 'Sneakers',
    colors: [
      {name: 'Pastel', hex: '#E8D9F2'},
      {name: 'White', hex: '#F4F4F2'},
      {name: 'Blue', hex: '#B7D3F2'},
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 9],
    description:
      'Created for the hardwood but taken to the streets, the ’80s basketball icon returns with classic details and retro appeal. Soft leather and a low-cut collar keep it comfortable all day.',
  },
  {
    id: 'jordan-4',
    name: 'Air Jordan 4 Retro',
    brand: 'Jordan',
    price: 650000,
    oldPrice: 800000,
    rating: 4.8,
    reviews: 124,
    image: img.orangeJordan,
    gallery: [img.orangeJordan, img.jordanCourt, img.blueJordan, img.whiteJordanPair],
    category: 'Sneakers',
    badge: '19% OFF',
    colors: [
      {name: 'White', hex: '#F4F4F2'},
      {name: 'Black', hex: '#1C1C1E'},
      {name: 'Grey', hex: '#B9BCC2'},
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 9],
    description:
      'The Air Jordan 4 Retro revives the ’89 classic with premium leather, breathable mesh and visible Air cushioning. A timeless silhouette with an unmistakable attitude.',
  },
  {
    id: 'new-balance-574',
    name: 'New Balance 574',
    brand: 'New Balance',
    price: 390000,
    rating: 4.5,
    reviews: 64,
    image: img.oliveRunner,
    gallery: [img.oliveRunner, img.greenRunner, img.darkRunner, img.pumaCourt],
    category: 'Sneakers',
    colors: [
      {name: 'Olive', hex: '#6F7550'},
      {name: 'Grey', hex: '#B9BCC2'},
    ],
    sizes: [7, 8, 9, 10, 11],
    description:
      'The most New Balance shoe ever. A classic mix of suede and mesh with an ENCAP midsole for all-day comfort and a timeless, everyday look.',
  },
  {
    id: 'puma-court',
    name: 'Puma Court Star',
    brand: 'Puma',
    price: 320000,
    rating: 4.4,
    reviews: 41,
    image: img.pumaCourt,
    gallery: [img.pumaCourt, img.whiteForce, img.darkRunner, img.pastelLow],
    category: 'Sneakers',
    colors: [
      {name: 'White', hex: '#F4F4F2'},
      {name: 'Black', hex: '#1C1C1E'},
    ],
    sizes: [6, 7, 8, 9, 10],
    description:
      'A clean court silhouette with a soft leather upper and a cushioned footbed. Minimal, versatile and built for everyday wear.',
  },
  {
    id: 'vans-old-skool',
    name: 'Vans Old Skool',
    brand: 'Vans',
    price: 340000,
    rating: 4.6,
    reviews: 73,
    image: img.burgundy,
    gallery: [img.burgundy, img.darkRunner, img.jordanCourt, img.oliveRunner],
    category: 'Sneakers',
    colors: [
      {name: 'Burgundy', hex: '#7B2233'},
      {name: 'Black', hex: '#1C1C1E'},
    ],
    sizes: [6.5, 7, 8, 9, 10, 11],
    description:
      'The Old Skool was our first to feature the iconic side stripe. Today it is still a classic, with sturdy canvas and suede uppers and a vulcanised grip sole.',
  },
  {
    id: 'sony-xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 1200000,
    oldPrice: 1450000,
    rating: 4.9,
    reviews: 210,
    image: img.headphones,
    gallery: [img.headphones, img.watch, img.gucciBag, img.headphones],
    category: 'Accessories',
    badge: 'Hot',
    colors: [
      {name: 'Black', hex: '#1C1C1E'},
      {name: 'Silver', hex: '#D6D6D8'},
    ],
    sizes: [],
    description:
      'Industry-leading noise cancellation with two processors and eight microphones. Up to 30 hours of battery, crystal-clear calls and a feather-light fit.',
  },
  {
    id: 'gucci-marmont',
    name: 'GG Marmont Mini Bag',
    brand: 'Gucci',
    price: 2350000,
    rating: 4.7,
    reviews: 38,
    image: img.gucciBag,
    gallery: [img.gucciBag, img.womanShopping, img.watch, img.headphones],
    category: 'Women',
    colors: [
      {name: 'Black', hex: '#1C1C1E'},
      {name: 'Dusty Pink', hex: '#D9A9A6'},
    ],
    sizes: [],
    description:
      'The mini GG Marmont chain bag is crafted from matelassé leather with the unmistakable Double G hardware. Compact, elegant and made to be noticed.',
  },
  {
    id: 'apple-watch',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    price: 1850000,
    rating: 4.8,
    reviews: 156,
    image: img.watch,
    gallery: [img.watch, img.headphones, img.gucciBag, img.watch],
    category: 'Accessories',
    colors: [
      {name: 'Starlight', hex: '#EFE7DC'},
      {name: 'Midnight', hex: '#24262B'},
    ],
    sizes: [],
    description:
      'A powerful health companion with a brighter display, the S9 chip and double tap. Track workouts, sleep, heart rate and stay connected all day.',
  },
];

export const byId = (id: string) => products.find(p => p.id === id) ?? products[0];

export const orders = [
  {
    id: '#SP123456',
    date: 'Oct 28, 2026',
    total: 1665000,
    status: 'Delivered' as const,
  },
  {
    id: '#SP123455',
    date: 'Oct 20, 2026',
    total: 450000,
    status: 'Processing' as const,
  },
  {
    id: '#SP123454',
    date: 'Oct 12, 2026',
    total: 1200000,
    status: 'Shipped' as const,
  },
];
