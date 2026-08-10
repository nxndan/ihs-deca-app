// ============================================================
//  Knights' Market — menu data (single source of truth)
//  To update: edit prices/flavors/items here. Images live in
//  /public/menu/<id>.png. Add a new item by copying a block.
// ============================================================

export type CategoryId = "snacks" | "drinks" | "merch";

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // USD
  priceNote?: string; // e.g. "for 2", "Pink Lemon $2.50"
  image?: string; // path under /public, e.g. "/menu/dr-pepper.png"
  flavors?: string[];
  note?: string; // e.g. "While supplies last"
  badge?: string; // small callout, e.g. "Zero Sugar"
  brand?: string; // groups products for brand filters, e.g. "ghost"
  clearance?: boolean; // on clearance right now
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "snacks", label: "Snacks" },
  { id: "drinks", label: "Drinks" },
  { id: "merch", label: "Merch" },
];

// Per-category callout shown under the section title.
// Category-wide tag. Clearance is now per-item (see `clearance` on MenuItem),
// so only Merch carries a category-wide tag.
export const CATEGORY_TAGS: Record<CategoryId, string | null> = {
  snacks: null,
  drinks: null,
  merch: "Taxable",
};

export const MARKET_INFO = {
  hours: [
    { days: "Mon – Fri", time: "8:25 – 8:50 AM" },
    { days: "Mon – Thu", time: "4:35 – 4:50 PM" },
    { days: "Activity Period", time: "Mobile cart" },
  ],
  payments: [
    "Apple Pay — before & after school",
    "Card or cash — during activity period",
  ],
};

export const MENU: MenuItem[] = [
  // ---------------- SNACKS (Clearance) ----------------
  {
    id: "beef-jerky",
    name: "Jack Link's Beef Jerky",
    category: "snacks",
    price: 2.5,
    image: "/menu/beef-jerky.png",
    flavors: ["Jalapeño", "Pepper", "Sweet & Hot"],
  },
  {
    id: "milano",
    name: "Dark Chocolate Milano",
    category: "snacks",
    price: 1.5,
    image: "/menu/milano.png",
  },
  {
    id: "welch-fruit-snacks",
    name: "Welch's Fruit Snacks",
    category: "snacks",
    price: 0.5,
    image: "/menu/welch-fruit-snacks.png",
    flavors: ["Original", "Berries n' Cherries"],
  },
  {
    id: "extra-gum",
    name: "Extra Gum",
    category: "snacks",
    price: 2.0,
    priceNote: "Pink Lemon $2.50",
    image: "/menu/extra-gum.png",
    flavors: ["Various flavors"],
  },
  {
    id: "dot-pretzels",
    name: "Dot's Pretzels",
    category: "snacks",
    price: 2.5,
    image: "/menu/dot-pretzels.png",
    flavors: ["Original 1.5 oz"],
  },
  {
    id: "skinny-pop",
    name: "Skinny Pop",
    category: "snacks",
    price: 2.5,
    image: "/menu/skinny-pop.png",
    flavors: ["Original 0.65 oz", "White Cheddar 0.65 oz"],
  },
  {
    id: "pringles",
    name: "Pringles",
    category: "snacks",
    price: 1.25,
    image: "/menu/pringles.png",
    flavors: [
      "Original",
      "Sour Cream",
      "Cheddar Cheese",
      "Sour Cream & Cheddar",
      "Pizza",
      "BBQ",
    ],
  },
  {
    id: "sun-chips",
    name: "Sun Chips",
    category: "snacks",
    price: 1.5,
    image: "/menu/sun-chips.png",
    flavors: ["Harvest Cheddar", "Garden Salsa"],
  },
  {
    id: "lays-kettle",
    name: "Lay's Kettle Cooked Chips",
    category: "snacks",
    price: 1.5,
    image: "/menu/lays-kettle.png",
    flavors: ["Regular", "Barbecue"],
  },
  {
    id: "white-cheddar-cheetos",
    name: "White Cheddar Cheetos",
    category: "snacks",
    price: 1.5,
    image: "/menu/white-cheddar-cheetos.png",
    flavors: ["Crunchy", "Puffs"],
    clearance: true,
  },
  {
    id: "baked-chips",
    name: "Baked Chips",
    category: "snacks",
    price: 1.5,
    image: "/menu/baked-chips.png",
    flavors: [
      "Crunchy Cheese Cheetos",
      "Cheddar & Sour Cream Ruffles",
      "Original Lay's",
      "Flamin' Hot Cheetos",
    ],
  },
  {
    id: "miss-vickies",
    name: "Miss Vickie's Kettle Chips",
    category: "snacks",
    price: 1.5,
    image: "/menu/miss-vickies.png",
    flavors: ["BBQ", "Jalapeño"],
  },
  {
    id: "pop-tarts",
    name: "Kellogg's Pop-Tarts",
    category: "snacks",
    price: 2.5,
    priceNote: "for 2",
    image: "/menu/pop-tarts.png",
    flavors: [
      "Frosted Blueberry",
      "Frosted Cherry",
      "Frosted Raspberry",
      "Frosted Strawberry",
    ],
  },

  // ---------------- DRINKS ----------------
  {
    id: "dr-pepper",
    name: "Dr. Pepper",
    category: "drinks",
    price: 2.5,
    image: "/menu/dr-pepper.png",
    badge: "Zero Sugar",
  },
  {
    id: "dr-pepper-cherry",
    name: "Dr. Pepper Cherry",
    category: "drinks",
    price: 2.5,
    image: "/menu/dr-pepper.png",
    badge: "Zero Sugar",
  },
  {
    id: "aw-root-beer",
    name: "A&W Root Beer",
    category: "drinks",
    price: 2.5,
    image: "/menu/aw-root-beer.png",
    badge: "Zero Sugar",
  },
  {
    id: "sunkist",
    name: "Sunkist Orange",
    category: "drinks",
    price: 2.5,
    image: "/menu/sunkist.png",
    badge: "Zero Sugar",
    clearance: true,
  },
  {
    id: "7up",
    name: "7•UP",
    category: "drinks",
    price: 2.5,
    image: "/menu/7up.png",
    badge: "Zero Sugar",
    clearance: true,
  },
  {
    id: "deja-blue",
    name: "Deja Blue Water",
    category: "drinks",
    price: 2.0,
    image: "/menu/deja-blue.png",
  },
  // Ghost Energy — each flavor is its own product (filter: "Ghost")
  {
    id: "ghost-cherry-limeade",
    name: "Ghost Cherry Limeade",
    category: "drinks",
    brand: "ghost",
    price: 3.5,
    badge: "Zero Sugar",
    image: "/menu/ghost-cherry-limeade.png",
  },
  {
    id: "ghost-sour-pink-lemonade",
    name: "Ghost Sour Pink Lemonade",
    category: "drinks",
    brand: "ghost",
    price: 3.5,
    badge: "Zero Sugar",
    image: "/menu/ghost-sour-pink-lemonade.png",
  },
  {
    id: "ghost-strawbango",
    name: "Ghost Strawbango",
    category: "drinks",
    brand: "ghost",
    price: 3.5,
    badge: "Zero Sugar",
    image: "/menu/ghost-strawbango.png",
  },
  {
    id: "ghost-sour-patch-red",
    name: "Ghost Sour Patch Redberry",
    category: "drinks",
    brand: "ghost",
    price: 3.5,
    badge: "Zero Sugar",
    image: "/menu/ghost-sour-patch-red.png",
  },
  {
    id: "ghost-sour-patch-blue",
    name: "Ghost Sour Patch Blue Raspberry",
    category: "drinks",
    brand: "ghost",
    price: 3.5,
    badge: "Zero Sugar",
    image: "/menu/ghost-sour-patch-blue.png",
  },
  {
    id: "electrolit",
    name: "Electrolit",
    category: "drinks",
    price: 2.5,
    image: "/menu/electrolit.png",
    flavors: ["Lemon Breeze", "Fruit Punch Splash", "Berry Blast"],
    clearance: true,
  },

  // ---------------- MERCHANDISE (Taxable) ----------------
  {
    id: "chromebook-charger",
    name: "Chromebook Charger",
    category: "merch",
    price: 20.0,
    image: "/menu/chromebook-charger.png",
  },
  {
    id: "phone-charger-plug",
    name: "Phone Charger (Plug)",
    category: "merch",
    price: 6.0,
    image: "/menu/phone-charger-plug.png",
  },
  {
    id: "wired-earbuds",
    name: "Wired Earbuds (USB-C)",
    category: "merch",
    price: 6.0,
    image: "/menu/wired-earbuds.png",
  },
  {
    id: "phone-charger-usbc",
    name: "Phone Charger (USB-C)",
    category: "merch",
    price: 8.0,
    image: "/menu/phone-charger-usbc.png",
  },
  {
    id: "past-deca-tshirt",
    name: "Past DECA T-Shirts",
    category: "merch",
    price: 10.0,
    image: "/menu/deca-tshirt.png",
    note: "While supplies last",
  },
  {
    id: "spirit-tshirt",
    name: "Spirit T-Shirts",
    category: "merch",
    price: 20.0,
    image: "/menu/deca-tshirt.png",
    note: "Customizable",
  },
];
