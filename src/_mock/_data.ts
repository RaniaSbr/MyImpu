import {
  _id,
  _price,
  _times,
  _company,
  _isverified,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from './_mock';
// Fonction pour obtenir la couleur en fonction du statut


// Statuts supplémentaires
const statuses = ["1.25", "0.50", "1.00", "0.63", "1.50", "1.25", "0.87", "1.01", "0.50"];
const cv = [
  "8750,00",
  "7000,00",
  "10062,50",
  "8750,00",
  "8600,00",
  "11200,00",
  "9900,00",
  "11890,00",
  "10500,00"
];
const fi = [
  "5625,00",
  "2238,75",
  "4500,00",
  "2812,50",
  "6750,00",
  "5625,00",
  "3912,75",
  "4528,13",
  "2238,75"
];
const di = [
  "-1125,00",
  "2261,25",
  "0,00",
  "1687,50",
  "-2250,00",
  "-1125,00",
  "587,25",
  "-28,13",
  "2261,25"
];


const cpt = [
  "14375.00",
  "9238.75",
  "14562.50",
  "11562.50",
  "15350.00",
  "16825.00",
  "13812.75",
  "16418.13",
  "12738.75"
];
const mb = ["Boni", "Mali", "Mali", "Boni", "Boni", "Mali", "Boni", "Mali"];



const cpu = [
  "2.88",
  "4.64",
  "3.64",
  "4.63",
  "2.56",
  "3.37",
  "3.97",
  "4.08",
  "6.40"
];
const cpv = [
  "1.75",
  "3.52",
  "2.52",
  "3.50",
  "1.43",
  "2.24",
  "2.85",
  "2.95",
  "5.28"
];
const cfu = [
  "1.13", "1.13", "1.13", "1.13", "1.13", "1.13", "1.13", "1.13", "1.13"
];

const diff = [
  "-1125.00", "2261.25", "0.00", "1687.50", "-2250.00", "-1125.00", "587.25", "-28.13", "2261.25"
];
const cf = [
  "4500,00", "4500,00", "4500,00", "4500,00", 
  "4500,00", "4500,00", "4500,00", "4500,00", 
  "4500,00"
];


// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Comptable',
  email: 'compta@sonatrach.dz',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(9)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  quantity: _isverified(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: statuses[index] || '0',  // Utilisation des valeurs numériques
  role: ['4000'][index] || '4000',
  // Ajout des statuts supplémentaires dans l'objet utilisateur
status2: cv[index] || '0',
status22: cf[index] || '0',
  status3: cpt[index] || '0',
  status4: cpu[index] || '0',
  status44: cpv[index] || '0',
  status5: fi[index] || '0',
  status55: cfu[index] || '0',
  status66: diff[index] || '0',
    status7: mb[index] || '0',

}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 === 0 ? _price(index) : null,
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') ||
      ([4, 8, 12].includes(setIndex) && 'new') ||
      '',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  { value: 'en', label: 'English', icon: '/assets/icons/flags/ic-flag-en.svg' },
  { value: 'de', label: 'German', icon: '/assets/icons/flags/ic-flag-de.svg' },
  { value: 'fr', label: 'French', icon: '/assets/icons/flags/ic-flag-fr.svg' },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _traffic = [
  { value: 'facebook', label: 'Facebook', total: 19500 },
  { value: 'google', label: 'Google', total: 91200 },
  { value: 'linkedin', label: 'Linkedin', total: 69800 },
  { value: 'twitter', label: 'Twitter', total: 84900 },
];

// ----------------------------------------------------------------------

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];
