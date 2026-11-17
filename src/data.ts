import { Page } from './types';

export const INITIAL_PAGES: Page[] = [
  {
    id: 1,
    url: 'pune-food-guide.com',
    title: 'Pune Food Guide — Best Places to Eat in Pune',
    content: 'Where to eat in Pune - vada pav and biryani and pizza',
    linksTo: [2],
  },
  {
    id: 2,
    url: 'best-pizza-pune.com',
    title: 'Best Pizza in Pune — Wood-fired Artisan Crusts',
    content: 'Fresh wood-fired pizza made daily - try our cheese pizza',
    linksTo: [1, 3],
  },
  {
    id: 3,
    url: 'college-canteen-blog.com',
    title: 'Campus Food & Chai Reviews — Student Food Blog',
    content: 'Student reviews of canteen food and chai and Friday pizza',
    linksTo: [2, 4],
  },
  {
    id: 4,
    url: 'pizza-recipes-home.com',
    title: 'Homemade Pizza Recipes — Crust & Sauce Secrets',
    content: 'Make pizza at home - pizza dough and pizza sauce',
    linksTo: [2, 5],
  },
  {
    id: 5,
    url: 'cheap-eats-pune.com',
    title: 'Cheap Eats Pune — Street Food & Daily Budget Meals',
    content: 'Good food under 100 rupees - misal and dosa and pizza slices',
    linksTo: [2],
  },
  {
    id: 6,
    url: 'pizza-pizza-pizza.com',
    title: 'pizza pizza pizza — pizza portal',
    content: 'pizza pizza pizza pizza pizza pizza pizza pizza pizza pizza',
    linksTo: [1],
    isSpam: true,
  },
];
