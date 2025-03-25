export interface Product {
  id: number;
  name: string;
  category: "poster" | "figure" | "keychain" | "plushie";
  price: number;
  rating: number;
  mainImage: string;
  images: string[];
  description: string;
  stock: number;
  useCustomImages?: boolean; // Add the missing property as optional
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  productId: number;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Demon Slayer: Tanjiro & Nezuko Wall Poster",
    category: "poster",
    price: 699,
    rating: 4.8,
    mainImage: "https://www.shutterstock.com/image-vector/demon-slayer-kamado-tanjiro-nezuko-600nw-2348055490.jpg",
    images: [
      "https://www.shutterstock.com/image-vector/demon-slayer-kamado-tanjiro-nezuko-600nw-2348055490.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2218383092/display_1500/stock-photo-zagreb-croatia-january-collection-of-the-main-characters-of-the-popular-anime-and-manga-2218383092.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2279927375/display_1500/stock-photo-zagreb-croatia-february-nezuko-and-tanjiro-are-characters-from-a-popular-anime-tv-series-2279927375.jpg"
    ],
    description: "High-quality wall poster featuring Tanjiro and Nezuko from Demon Slayer. This premium art print is made with archival inks on heavy matte paper for a stunning visual display. Perfect for any anime fan's room or collection.",
    stock: 50,
    useCustomImages: true
  },
  {
    id: 2,
    name: "Attack on Titan: Levi Ackerman Action Figure",
    category: "figure",
    price: 2499,
    rating: 4.9,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/1953329410/display_1500/stock-photo-bangkok-thailand-may-levi-ackerman-action-figure-character-from-attack-on-titan-or-1953329410.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/1953329410/display_1500/stock-photo-bangkok-thailand-may-levi-ackerman-action-figure-character-from-attack-on-titan-or-1953329410.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2077946747/display_1500/stock-photo-bangkok-thailand-june-levi-ackerman-action-figure-character-from-attack-on-titan-or-2077946747.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1953330517/display_1500/stock-photo-bangkok-thailand-may-levi-ackerman-action-figure-character-from-attack-on-titan-or-shingeki-1953330517.jpg"
    ],
    description: "Highly detailed action figure of Levi Ackerman from Attack on Titan. This meticulously crafted figure stands 24cm tall and features multiple articulation points for dynamic posing. Includes 3D maneuver gear accessories and display stand.",
    stock: 25,
    useCustomImages: true
  },
  {
    id: 3,
    name: "My Hero Academia: Deku Keychain",
    category: "keychain",
    price: 349,
    rating: 4.5,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/2277030036/display_1500/stock-photo-minsk-belarus-january-izuku-midoriya-deku-keychain-from-the-anime-my-hero-academia-on-a-2277030036.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/2277030036/display_1500/stock-photo-minsk-belarus-january-izuku-midoriya-deku-keychain-from-the-anime-my-hero-academia-on-a-2277030036.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2180356228/display_1500/stock-photo-zagreb-croatia-december-izuku-midoriya-deku-from-the-my-hero-academia-show-isolated-on-2180356228.jpg"
    ],
    description: "Cute and durable keychain featuring Izuku 'Deku' Midoriya from My Hero Academia. Made from high-quality PVC material with metal ring. Perfect for keys, bags, or as a collectible.",
    stock: 100,
    useCustomImages: true
  },
  {
    id: 4,
    name: "One Piece: Luffy Premium Art Print",
    category: "poster",
    price: 899,
    rating: 4.7,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/2288461926/display_1500/stock-photo-bangkok-thailand-march-water-color-print-art-of-monkey-d-luffy-in-one-piece-film-red-2288461926.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/2288461926/display_1500/stock-photo-bangkok-thailand-march-water-color-print-art-of-monkey-d-luffy-in-one-piece-film-red-2288461926.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2176634465/display_1500/stock-photo-belgrade-serbia-december-monkey-d-luffy-wanted-poster-dead-or-alive-the-protagonist-2176634465.jpg"
    ],
    description: "Premium art print featuring Monkey D. Luffy from One Piece. This limited edition poster is printed on high-quality museum-grade paper with archival inks that resist fading. Each print comes with a certificate of authenticity.",
    stock: 30,
    useCustomImages: true
  },
  {
    id: 5,
    name: "Naruto Shippuden: Kakashi Hatake Figure",
    category: "figure",
    price: 1999,
    rating: 4.6,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/1943359476/display_1500/stock-photo-bangkok-thailand-may-kakashi-hatake-action-figure-character-from-naruto-or-naruto-1943359476.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/1943359476/display_1500/stock-photo-bangkok-thailand-may-kakashi-hatake-action-figure-character-from-naruto-or-naruto-1943359476.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1910764176/display_1500/stock-photo-minsk-belarus-january-kakashi-hatake-action-figure-character-from-naruto-shippuden-anime-1910764176.jpg"
    ],
    description: "Detailed Kakashi Hatake figure from Naruto Shippuden. This 22cm tall figure captures Kakashi in his iconic pose with Chidori. Features incredible detail from his Sharingan eye to his ninja vest. Comes with a display base.",
    stock: 15,
    useCustomImages: true
  },
  {
    id: 6,
    name: "Spirited Away: No-Face Plushie",
    category: "plushie",
    price: 799,
    rating: 4.9,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/1902244096/display_1500/stock-photo-plush-toy-kaonashi-no-face-spirited-away-isolated-on-white-background-1902244096.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/1902244096/display_1500/stock-photo-plush-toy-kaonashi-no-face-spirited-away-isolated-on-white-background-1902244096.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1902244105/display_1500/stock-photo-plush-toy-kaonashi-no-face-spirited-away-on-white-background-1902244105.jpg"
    ],
    description: "Soft and huggable No-Face (Kaonashi) plushie from Studio Ghibli's Spirited Away. This 30cm plush toy is made from premium soft materials and is perfect for cuddling or display. Official Studio Ghibli merchandise.",
    stock: 40,
    useCustomImages: true
  },
  {
    id: 7,
    name: "Dragon Ball Z: Goku Ultra Instinct Poster",
    category: "poster",
    price: 599,
    rating: 4.7,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/2310785287/display_1500/stock-photo-jakarta-indonesia-march-son-goku-ultra-instinct-from-dragon-ball-super-anime-manga-2310785287.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/2310785287/display_1500/stock-photo-jakarta-indonesia-march-son-goku-ultra-instinct-from-dragon-ball-super-anime-manga-2310785287.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1978636516/display_1500/stock-photo-bali-indonesia-sep-sun-goku-ultra-instinct-dragon-ball-super-broly-movie-poster-in-the-1978636516.jpg"
    ],
    description: "Dynamic poster featuring Goku in his powerful Ultra Instinct form from Dragon Ball Z. This high-quality print captures all the energy and detail of this iconic transformation. Printed on premium paper with vibrant colors.",
    stock: 60,
    useCustomImages: true
  },
  {
    id: 8,
    name: "Jujutsu Kaisen: Gojo Satoru Figure",
    category: "figure",
    price: 2899,
    rating: 5.0,
    mainImage: "https://www.shutterstock.com/shutterstock/photos/2143820879/display_1500/stock-photo-bangkok-thailand-november-satoru-gojo-action-figure-character-from-jujutsu-kaisen-anime-2143820879.jpg",
    images: [
      "https://www.shutterstock.com/shutterstock/photos/2143820879/display_1500/stock-photo-bangkok-thailand-november-satoru-gojo-action-figure-character-from-jujutsu-kaisen-anime-2143820879.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2145235634/display_1500/stock-photo-bangkok-thailand-november-satoru-gojo-action-figure-character-from-jujutsu-kaisen-anime-2145235634.jpg"
    ],
    description: "Premium Gojo Satoru figure from Jujutsu Kaisen. This highly detailed 25cm figure captures Gojo's calm yet powerful presence with his iconic blindfold. Features special effects pieces to recreate his Infinity technique. Limited edition.",
    stock: 10,
    useCustomImages: true
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    userId: 101,
    userName: "AnimeNinja42",
    userAvatar: "https://i.pravatar.cc/150?img=32",
    productId: 1,
    rating: 5,
    comment: "Absolutely gorgeous poster! The colors are vibrant and it looks even better in person. Fast shipping too!",
    date: "2023-08-15"
  },
  {
    id: 2,
    userId: 102,
    userName: "MangaCollector",
    userAvatar: "https://i.pravatar.cc/150?img=26",
    productId: 1,
    rating: 4,
    comment: "Great quality print. The only reason I'm giving 4 stars is because it was slightly smaller than I expected, but still looks amazing on my wall.",
    date: "2023-07-28"
  },
  {
    id: 3,
    userId: 103,
    userName: "OtakuQueen",
    userAvatar: "https://i.pravatar.cc/150?img=28",
    productId: 2,
    rating: 5,
    comment: "This Levi figure is incredibly detailed! Worth every rupee. The articulation is great and he stands perfectly on the display base.",
    date: "2023-08-10"
  },
  {
    id: 4,
    userId: 104,
    userName: "ShinobiSage",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    productId: 2,
    rating: 5,
    comment: "As a collector, I can say this is one of the best Attack on Titan figures available. The sculpting and paint job are top-notch!",
    date: "2023-08-05"
  },
  {
    id: 5,
    userId: 105,
    userName: "PlusUltra2023",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    productId: 3,
    rating: 4,
    comment: "Cute Deku keychain! It's well-made but a bit smaller than I expected. Still, it looks great on my backpack!",
    date: "2023-08-18"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getReviewsByProductId = (productId: number): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
