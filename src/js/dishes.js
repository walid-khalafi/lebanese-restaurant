// ============================================================
// Nil Lebanese — Dish Database (single source of truth)
// Powers: navbar mega menu, Quick View modal,
// menu.html cards, dish-detail.html
// Include this file BEFORE js/main.js on every page.
// ============================================================

const TAHDIG_CATEGORIES = [
  { id: 'tahdig',   label: 'Charcoal Grills',     icon: 'bi-fire',         from: '£6.00' },
  { id: 'kebabs',   label: 'Wra£ & Shawarma',    icon: 'bi-journal-text', from: '£6.00' },
  { id: 'stews',    label: 'Curries & Hot Dishes', icon: 'bi-cup-hot-fill', from: '£6.00' },
  { id: 'starters', label: 'Mezze & Starters',    icon: 'bi-egg-fried',    from: '£5.50' },
  { id: 'salads',   label: 'Salads & Sou£',      icon: 'bi-flower1',      from: '£4.50' },
  { id: 'desserts', label: 'Desserts & Drinks',   icon: 'bi-cup-straw',    from: '£1.00' }
];

const FEATURED_SLUGS = ['chicken-shawarma-wrap', 'mixed-grill', 'veggie-mezze-platter'];
const DISHES = {

  // -- CHARCOAL GRILLS --

  'mixed-grill': {
    name: 'Mixed Grill',
    category: 'tahdig',
    price: '£12.00',
    badges: ['100% Halal', 'Charcoal Grilled', "Chef's Choice"],
    image: 'img/dish-mixed-grill.jpg',
    gallery: ['img/dish-mixed-grill.jpg', 'img/dish-chicken-shish.jpg'],
    short: 'A generous platter of charcoal-grilled chicken shish, lamb kofta and chicken wings served with rice and bread.',
    description: 'Our showpiece platter — charcoal-grilled chicken shish, spiced lamb kofta and crispy chicken wings, served with fluffy rice, warm pitta bread and a side salad. Everything cooked to order over real charcoal.',
    ingredients: ['Chicken Shish', 'Lamb Kofta', 'Chicken Wings', 'Basmati Rice', 'Pitta Bread', 'Side Salad'],
    pairing: 'Pairs perfectly with our homemade garlic sauce and a cold Ayran.'
  },

  'chicken-shish': {
    name: 'Chicken Shish',
    category: 'tahdig',
    price: '£9.50',
    badges: ['100% Halal', 'Charcoal Grilled'],
    image: 'img/dish-chicken-shish.jpg',
    gallery: ['img/dish-chicken-shish.jpg', 'img/dish-mixed-grill.jpg'],
    short: 'Marinated chicken breast cubes charcoal-grilled on skewers, served with rice, salad and bread.',
    description: 'Tender cubes of chicken breast marinated in Lebanese spices and charcoal-grilled on skewers until golden and juicy. Served with fluffy basmati rice, fresh salad and warm bread.',
    ingredients: ['Marinated Chicken Breast', 'Basmati Rice', 'Fresh Salad', 'Warm Bread', 'Garlic Sauce'],
    pairing: 'Great with a side of tabbouleh and a cold Ayran.'
  },

  'lamb-kofta': {
    name: 'Lamb Kofta',
    category: 'tahdig',
    price: '£10.50',
    badges: ['100% Halal', 'Charcoal Grilled'],
    image: 'img/dish-lamb-kofta.jpg',
    gallery: ['img/dish-lamb-kofta.jpg', 'img/dish-mixed-grill.jpg'],
    short: 'Hand-spiced minced lamb kofta skewers charcoal-grilled and served with rice and salad.',
    description: 'Hand-spiced minced British lamb formed on skewers and cooked over real charcoal until perfectly charred on the outside, tender within. Served with basmati rice, fresh salad and warm pitta.',
    ingredients: ['Spiced Minced Lamb', 'Basmati Rice', 'Fresh Salad', 'Pitta Bread', 'Chilli Sauce'],
    pairing: 'Best enjoyed with hummus on the side and a squeeze of fresh lemon.'
  },

  'grilled-chicken-wings': {
    name: 'Grilled Chicken Wings',
    category: 'tahdig',
    price: '£8.50',
    badges: ['100% Halal', 'Charcoal Grilled'],
    image: 'img/dish-chicken-wings.jpg',
    gallery: ['img/dish-chicken-wings.jpg', 'img/dish-mixed-grill.jpg'],
    short: 'Six charcoal-grilled chicken wings marinated in Lebanese spices, served with garlic sauce.',
    description: 'Six generously sized chicken wings marinated in our Lebanese spice blend and grilled over real charcoal until crispy and caramelised. Served with our homemade garlic sauce and a wedge of lemon.',
    ingredients: ['Chicken Wings (x6)', 'Lebanese Spice Marinade', 'Garlic Sauce', 'Lemon'],
    pairing: 'Try them alongside our Shirazi-style salad for a full meal.'
  },

  'boneless-chicken': {
    name: 'Boneless Grilled Chicken',
    category: 'tahdig',
    price: '£11.50',
    badges: ['100% Halal', 'Charcoal Grilled'],
    image: 'img/dish-boneless-chicken.jpg',
    gallery: ['img/dish-boneless-chicken.jpg', 'img/dish-chicken-shish.jpg'],
    short: 'Half boneless chicken marinated and charcoal grilled, served with chi£ or rice and salad.',
    description: 'Half a boneless chicken marinated in our signature Lebanese blend and slow-cooked over charcoal until the skin is golden and the meat falls apart. Served with your choice of chi£ or rice, and fresh salad.',
    ingredients: ['Half Boneless Chicken', 'Lebanese Marinade', 'Chi£ or Rice', 'Fresh Salad', 'Garlic Sauce'],
    pairing: 'Pairs perfectly with a cold Ayran or fresh lemonade.'
  },
  // -- WRA£ & SHAWARMA --

  'chicken-shawarma-wrap': {
    name: 'Chicken Shawarma Wrap',
    category: 'kebabs',
    price: '£6.00',
    badges: ['Bestseller', '100% Halal', 'Great Value'],
    image: 'img/dish-chicken-shawarma-wrap.jpg',
    gallery: ['img/dish-chicken-shawarma-wrap.jpg', 'img/dish-mixed-grill.jpg'],
    short: 'Our #1 — marinated chicken shawarma, garlic sauce, pickles and fresh salad in a warm wrap. Only £6.',
    description: 'Our most popular dish. Marinated chicken shawarma slow-cooked on the spit, shaved and loaded into a warm Lebanese flatbread with homemade garlic sauce, tangy pickles and crisp fresh salad.',
    ingredients: ['Marinated Chicken Shawarma', 'Homemade Garlic Sauce', 'Pickles', 'Fresh Salad', 'Lebanese Flatbread'],
    pairing: 'Best with a cold can of Pe£i or a refreshing Ayran.'
  },

  'lamb-shawarma-wrap': {
    name: 'Lamb Shawarma Wrap',
    category: 'kebabs',
    price: '£7.00',
    badges: ['100% Halal', 'Popular'],
    image: 'img/dish-lamb-shawarma-wrap.jpg',
    gallery: ['img/dish-lamb-shawarma-wrap.jpg', 'img/dish-mixed-grill.jpg'],
    short: 'Slow-cooked lamb shawarma with tahini sauce, tomatoes and pickles in a warm Lebanese flatbread.',
    description: 'Tender slow-cooked lamb shawarma shaved off the spit and wrapped in warm Lebanese flatbread with creamy tahini sauce, fresh tomatoes, onion and tangy pickles. Rich, satisfying and full of flavour.',
    ingredients: ['Lamb Shawarma', 'Tahini Sauce', 'Fresh Tomatoes', 'Onion', 'Pickles', 'Lebanese Flatbread'],
    pairing: 'Goes brilliantly with a side of our fattoush salad.'
  },

  'falafel-wrap': {
    name: 'Falafel Wrap',
    category: 'kebabs',
    price: '£6.00',
    badges: ['Vegetarian', 'Vegan', 'Great Value'],
    image: 'img/dish-falafel-wrap.jpg',
    gallery: ['img/dish-falafel-wrap.jpg', 'img/dish-falafel.jpg'],
    short: 'Crispy homemade falafel with hummus, tabbouleh and pickles in a warm flatbread. Vegan.',
    description: 'Crispy homemade falafel — made fresh from chickpeas and herbs — wrapped in warm Lebanese flatbread with smooth hummus, fresh tabbouleh, sliced tomatoes and tangy pickles. 100% vegan.',
    ingredients: ['Homemade Falafel', 'Hummus', 'Tabbouleh', 'Tomatoes', 'Pickles', 'Lebanese Flatbread'],
    pairing: 'Perfect with a tahini drizzle and a fresh lemonade.'
  },

  'mixed-wrap': {
    name: 'Mixed Shish Wrap',
    category: 'kebabs',
    price: '£7.50',
    badges: ['100% Halal'],
    image: 'img/dish-mixed-shish-wrap.jpg',
    gallery: ['img/dish-mixed-shish-wrap.jpg', 'img/dish-chicken-shawarma-wrap.jpg'],
    short: 'Chicken shish and lamb kofta in a warm Lebanese flatbread with garlic sauce and salad.',
    description: 'The best of both worlds — charcoal-grilled chicken shish and spiced lamb kofta wrapped together in warm Lebanese flatbread with homemade garlic sauce, fresh salad and pickles.',
    ingredients: ['Chicken Shish', 'Lamb Kofta', 'Garlic Sauce', 'Fresh Salad', 'Pickles', 'Lebanese Flatbread'],
    pairing: 'Try it with a side of chi£ for a proper feast.'
  },

  // -- CURRIES & HOT DISHES --

  'chicken-curry-rice': {
    name: 'Chicken Curry with Rice',
    category: 'stews',
    price: '£6.00',
    badges: ['100% Halal', 'Great Value', 'Most Popular'],
    image: 'img/dish-chicken-curry.jpg',
    gallery: ['img/dish-chicken-curry.jpg'],
    short: 'Tender chicken in a rich curry sauce with fluffy basmati rice. Only £6.',
    description: 'Tender chunks of chicken cooked in our flavourful curry sauce — rich, aromatic and just the right amount of warmth — served over fluffy basmati rice. One of our best-sellers and brilliant value at £6.',
    ingredients: ['Chicken Breast', 'Rich Curry Sauce', 'Basmati Rice', 'Fresh Herbs'],
    pairing: 'Delicious with a warm pitta bread on the side.'
  },

  'lamb-curry-rice': {
    name: 'Lamb Curry with Rice',
    category: 'stews',
    price: '£7.50',
    badges: ['100% Halal'],
    image: 'img/dish-lamb-curry.jpg',
    gallery: ['img/dish-lamb-curry.jpg'],
    short: 'Slow-cooked British lamb in a rich aromatic curry sauce, served with fluffy basmati rice.',
    description: 'Slow-cooked tender pieces of British lamb in a deep, aromatic curry sauce served over fluffy basmati rice. Hearty, warming and full of flavour — proper comfort food.',
    ingredients: ['British Lamb', 'Aromatic Curry Sauce', 'Basmati Rice'],
    pairing: 'Best with a cold Ayran or sparkling water to balance the warmth.'
  },

  'vegetable-curry': {
    name: 'Vegetable Curry with Rice',
    category: 'stews',
    price: '£6.00',
    badges: ['Vegetarian', 'Vegan', 'Great Value'],
    image: 'img/dish-veg-curry.jpg',
    gallery: ['img/dish-veg-curry.jpg'],
    short: 'Seasonal vegetables slow-cooked in a rich curry sauce, served with basmati rice. Vegan.',
    description: 'A generous portion of seasonal vegetables slow-cooked in our aromatic curry sauce and served over fluffy basmati rice. Fully vegan and packed with flavour — great value at £6.',
    ingredients: ['Seasonal Vegetables', 'Curry Sauce', 'Basmati Rice'],
    pairing: 'Pairs well with our falafel wrap for a full vegan spread.'
  },  // -- MEZZE & STARTERS --

  'veggie-mezze-platter': {
    name: 'Vegetarian Mezze Platter',
    category: 'starters',
    price: '£9.90',
    badges: ['Vegetarian', 'For Two', 'Popular'],
    image: 'img/dish-mezze-platter.jpg',
    gallery: ['img/dish-mezze-platter.jpg', 'img/dish-hummus.jpg', 'img/dish-falafel.jpg'],
    short: 'Hummus, moutabal, tabbouleh, falafel, samosas and warm bread. Perfect for two.',
    description: 'Our legendary sharing platter — freshly made hummus, smoky moutabal, vibrant tabbouleh, crispy falafel, golden vegetable samosas and warm Lebanese bread.',
    ingredients: ['Hummus', 'Moutabal', 'Tabbouleh', 'Falafel (3 pcs)', 'Vegetable Samosas', 'Lebanese Bread'],
    pairing: 'Ideal with extra Lebanese bread and a drizzle of olive oil.'
  },

  'hummus': {
    name: 'Hummus with Bread',
    category: 'starters',
    price: '£5.90',
    badges: ['Vegetarian', 'Vegan', 'Fresh Daily'],
    image: 'img/dish-hummus.jpg',
    gallery: ['img/dish-hummus.jpg'],
    short: 'Smooth homemade hummus with olive oil drizzle, paprika and warm Lebanese flatbread.',
    description: 'Creamy, smooth homemade hummus made fresh every morning from quality chickpeas, tahini and lemon. Served with olive oil, paprika and warm Lebanese flatbread.',
    ingredients: ['Chickpeas', 'Tahini', 'Lemon', 'Olive Oil', 'Paprika', 'Lebanese Flatbread'],
    pairing: 'Goes beautifully with any of our charcoal grill dishes.'
  },

  'moutabal': {
    name: 'Moutabal (Aubergine Dip)',
    category: 'starters',
    price: '£5.90',
    badges: ['Vegetarian', 'Vegan', 'Smoky'],
    image: 'img/dish-moutabal.jpg',
    gallery: ['img/dish-moutabal.jpg'],
    short: 'Smoky roasted aubergine blended with tahini, garlic and lemon. A Lebanese classic.',
    description: 'Smoky roasted aubergine blended until silky smooth with tahini, fresh garlic and lemon juice, finished with olive oil and fresh parsley. Served with warm Lebanese bread.',
    ingredients: ['Roasted Aubergine', 'Tahini', 'Garlic', 'Lemon Juice', 'Olive Oil', 'Parsley', 'Lebanese Bread'],
    pairing: 'Perfect alongside our hummus as part of a sharing mezze.'
  },

  'falafel-starter': {
    name: 'Falafel (6 pcs)',
    category: 'starters',
    price: '£5.50',
    badges: ['Vegetarian', 'Vegan', 'Homemade'],
    image: 'img/dish-falafel.jpg',
    gallery: ['img/dish-falafel.jpg'],
    short: 'Six crispy homemade falafel made from chickpeas and fresh herbs, served with tahini dip.',
    description: 'Six golden crispy falafel made fresh from whole chickpeas, parsley, coriander and warming spices, fried to order. Served with our homemade tahini dipping sauce.',
    ingredients: ['Chickpeas', 'Parsley', 'Coriander', 'Spices', 'Tahini Dip'],
    pairing: 'Excellent with a drizzle of hot sauce and warm Lebanese bread.'
  },

  'full-english': {
    name: 'Full English Breakfast',
    category: 'starters',
    price: '£8.50',
    badges: ['Breakfast', '100% Halal', 'All Day'],
    image: 'img/dish-full-english.jpg',
    gallery: ['img/dish-full-english.jpg'],
    short: '2 eggs, 2 toast, 2 halal sausages, mushrooms, baked beans and grilled tomato. Only £8.50.',
    description: 'A proper full English to set you up for the day — 2 eggs cooked your way, 2 slices of toast, 2 halal beef sausages, sauteed mushrooms, baked beans and a grilled tomato. Served from 8 AM.',
    ingredients: ['2 Eggs (your choice)', '2 Halal Sausages', '2 Toast', 'Mushrooms', 'Baked Beans', 'Grilled Tomato'],
    pairing: 'Starts the morning right — pair with a fresh coffee or tea.'
  },
  // -- SALADS & SOU£ --

  'tabbouleh': {
    name: 'Tabbouleh Salad',
    category: 'salads',
    price: '£5.50',
    badges: ['Vegan', 'Gluten-Free Option', 'Fresh Daily'],
    image: 'img/dish-tabbouleh.jpg',
    gallery: ['img/dish-tabbouleh.jpg'],
    short: 'Finely chopped parsley, mint, tomatoes and bulgur wheat with lemon and olive oil.',
    description: 'Classic Lebanese tabbouleh — masses of finely chopped flat-leaf parsley and fresh mint, ripe tomatoes, spring onions and fine bulgur wheat, dressed with fresh lemon juice and cold-pressed olive oil.',
    ingredients: ['Flat-Leaf Parsley', 'Fresh Mint', 'Tomatoes', 'Bulgur Wheat', 'Spring Onion', 'Lemon', 'Olive Oil'],
    pairing: 'The perfect fresh side for any of our charcoal grill dishes.'
  },

  'fattoush': {
    name: 'Fattoush Salad',
    category: 'salads',
    price: '£5.50',
    badges: ['Vegetarian', 'Fresh Daily'],
    image: 'img/dish-fattoush.jpg',
    gallery: ['img/dish-fattoush.jpg'],
    short: 'Crisp romaine, tomatoes, cucumber, radish and toasted flatbread with sumac dressing.',
    description: 'Vibrant Lebanese fattoush — crisp romaine lettuce, ripe tomatoes, cucumber, radishes and fresh mint tossed with crispy toasted flatbread croutons and a tangy sumac and pomegranate molasses dressing.',
    ingredients: ['Romaine Lettuce', 'Tomatoes', 'Cucumber', 'Radish', 'Mint', 'Toasted Flatbread', 'Sumac Dressing'],
    pairing: 'Brilliant alongside a chicken shawarma wrap or mezze platter.'
  },

  'lentil-soup': {
    name: 'Lebanese Lentil Soup',
    category: 'salads',
    price: '£4.50',
    badges: ['Vegan', 'Warming', 'Gluten-Free'],
    image: 'img/dish-lentil-soup.jpg',
    gallery: ['img/dish-lentil-soup.jpg'],
    short: 'Silky red lentil soup with cumin, lemon and crispy fried onion topping. A Lebanese staple.',
    description: 'Silky smooth Lebanese lentil soup made from red lentils slow-cooked with cumin, turmeric and fresh lemon juice, finished with crispy fried onions and a swirl of olive oil.',
    ingredients: ['Red Lentils', 'Cumin', 'Turmeric', 'Lemon Juice', 'Crispy Onions', 'Olive Oil'],
    pairing: 'Perfect with a warm pitta bread to dip in.'
  },

  // -- DESSERTS & DRINKS --

  'baklava': {
    name: 'Baklava (3 pcs)',
    category: 'desserts',
    price: '£4.50',
    badges: ['Vegetarian', 'Homemade'],
    image: 'img/dish-baklava.jpg',
    gallery: ['img/dish-baklava.jpg'],
    short: 'Three pieces of crisp golden baklava — flaky pastry, crushed pistachios and honey syrup.',
    description: 'Three pieces of our golden Lebanese baklava — delicate layers of crisp filo pastry filled with crushed pistachios and sweet almonds, soaked in fragrant orange blossom honey syrup.',
    ingredients: ['Filo Pastry', 'Crushed Pistachios', 'Almonds', 'Orange Blossom Honey Syrup'],
    pairing: 'Perfect with a Lebanese tea or a Turkish coffee.'
  },

  'Lebanese-tea': {
    name: 'Lebanese Tea with Mint',
    category: 'desserts',
    price: '£2.00',
    badges: ['Hot Drink', 'With Mint'],
    image: 'img/dish-lebanese-tea.jpg',
    gallery: ['img/dish-lebanese-tea.jpg'],
    short: 'Slow-steeped black tea with fresh mint leaves. Served hot in a traditional glass.',
    description: 'Slow-steeped black tea infused with fresh spearmint leaves, served hot in a traditional tall glass. The classic end to any Lebanese meal — fragrant, warming and deeply satisfying.',
    ingredients: ['Black Tea', 'Fresh Mint Leaves', 'Sugar (optional)'],
    pairing: 'The perfect close to any Nil Lebanese meal.'
  },

  'ayran': {
    name: 'Ayran Yogurt Drink',
    category: 'desserts',
    price: '£2.50',
    badges: ['Refreshing', 'Cold Drink'],
    image: 'img/dish-ayran.jpg',
    gallery: ['img/dish-ayran.jpg'],
    short: 'Chilled salted yogurt drink with mint — the classic Lebanese cooler alongside any grill.',
    description: 'Chilled, lightly salted yogurt blended smooth with mineral water and a hint of dried mint. Refreshing, cooling and the perfect partner for charcoal-grilled meats.',
    ingredients: ['Cultured Yogurt', 'Mineral Water', 'Sea Salt', 'Dried Mint'],
    pairing: 'The best companion to any of our charcoal grill dishes or wra£.'
  },

  'cold-drink': {
    name: 'Cold Drinks',
    category: 'desserts',
    price: '£1.00',
    badges: ['From £1', 'Fridge Selection'],
    image: 'img/dish-cold-drinks.jpg',
    gallery: ['img/dish-cold-drinks.jpg'],
    short: 'Pe£i, 7UP, water and more from the fridge. From just £1.',
    description: 'A wide selection of cold drinks from the fridge — Pe£i, 7UP, Fanta, still and sparkling water, and fruit juices. Priced from just £1.',
    ingredients: ['Pe£i', '7UP', 'Fanta', 'Water', 'Juices'],
    pairing: 'The perfect refreshment alongside any meal at Nil Lebanese.'
  }

};
