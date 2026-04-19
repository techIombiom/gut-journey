const CHOICES = {
  morning: {
    A: { label: 'Just caffeine', sub: 'Chai, coffee — straight to the grind', score: 5, emoji: '☕' },
    B: { label: 'Light and quick', sub: 'Fruit, curd, nuts, protein bar', score: 12, emoji: '🌿' },
    C: { label: 'Traditional cooked breakfast', sub: 'Idli, dosa, poha, upma, pongal, paratha, thepla', score: 25, emoji: '🍽️' },
    D: { label: 'Heavy and hearty', sub: 'Puri bhaji, chole, full meal, leftovers', score: 16, emoji: '🍱' },
    E: { label: 'Gym focused', sub: 'Eggs, oats, protein shake, sprouts', score: 18, emoji: '💪' }
  },
  lunch: {
    base: {
      A: { label: 'White rice', emoji: '🍚', score: 0 },
      B: { label: 'Roti / chapati', emoji: '🫓', score: 2 },
      C: { label: 'Brown rice or millet', emoji: '🌾', score: 3 },
      D: { label: 'Skipped carbs', emoji: '❌', score: 0 }
    },
    protein: {
      A: { label: 'Dal / lentils', emoji: '🫕', score: 0 },
      B: { label: 'Rajma or chole', emoji: '🫘', score: 0 },
      C: { label: 'Paneer', emoji: '🧀', score: 0 },
      D: { label: 'Egg or chicken', emoji: '🥚', score: 0 },
      E: { label: 'Skipped protein', emoji: '❌', score: 0 }
    },
    veg: {
      A: { label: 'One sabzi', emoji: '🥬', score: 0 },
      B: { label: 'Two or more sabzi', emoji: '🥦', score: 3 },
      C: { label: 'Raw salad', emoji: '🥗', score: 3 },
      D: { label: 'No vegetables', emoji: '❌', score: 0 }
    },
    side: {
      A: { label: 'Curd or chaas', emoji: '🥛', score: 2 },
      B: { label: 'Papad + pickle', emoji: '🌶️', score: 0 },
      C: { label: 'Cold drink or juice', emoji: '🥤', score: 0 },
      D: { label: 'Nothing', emoji: '—', score: 0 }
    }
  },
  afternoon: {
    A: { label: 'Chai — again', sub: 'Third one today, with glucose biscuits', score: 10, emoji: '☕' },
    B: { label: 'Canteen snack', sub: 'Samosa, vada, bread pakoda, puffs', score: 13, emoji: '🍟' },
    C: { label: 'Desk snack', sub: 'Nuts, makhana, fruits from home', score: 25, emoji: '🥜' },
    D: { label: 'Power through', sub: 'Nothing — will eat more at dinner', score: 5, emoji: '😤' }
  },
  dinner: {
    A: { label: 'Full home cooked meal', sub: 'Dal chawal, sambar rice, roti sabzi, fish curry rice', score: 25, emoji: '🍽️' },
    B: { label: 'Quick and easy', sub: 'Khichdi, curd rice, bread omelette, leftovers', score: 18, emoji: '🥗' },
    C: { label: 'Ordered in', sub: 'Zomato, biryani, pizza, Chinese, rolls', score: 10, emoji: '📱' },
    D: { label: 'Skipped — too late or too tired', sub: 'Nothing, just milk, biscuits in bed', score: 5, emoji: '😴' }
  }
};

const RUNNER_CONFIG = {
  level1: { speed: 100, totalOrbs: 20, spawnInterval: 1700, duration: 20000, bgColor: '#0d1f3c', label: 'Your gut at 6am', flashTime: 13000 },
  level2: { speed: 140, totalOrbs: 30, spawnInterval: 1200, duration: 20000, bgColor: '#1a1a0d', label: 'Your gut at 1pm', flashTime: 13000 },
  level3: { speed: 175, totalOrbs: 40, spawnInterval: 900,  duration: 20000, bgColor: '#0d2010', label: 'Your gut at 4pm', flashTime: 12000 }
};

const PERSONAS = {
  stressed_sprinter_stress: {
    name: 'The Stressed Sprinter',
    emoji: '🏃',
    gradient: ['#FF6B6B', '#FF8E53'],
    line1: 'Running on chai and ambition.',
    line2: 'Your gut is working overtime without the right fuel.',
    primary: 'stresswise',
    secondary: 'gutsens',
    extraCheck: 'zenup_if_energy_crash'
  },
  stressed_sprinter_sleep: {
    name: 'The Stressed Sprinter',
    emoji: '🌙',
    gradient: ['#667eea', '#764ba2'],
    line1: 'Your gut is active when it should be resting.',
    line2: 'The sleep-gut connection is your missing link.',
    primary: 'sleepeasy',
    secondary: 'gutsens'
  },
  bloat_battler: {
    name: 'The Bloat Battler',
    emoji: '🫧',
    gradient: ['#F7971E', '#FFD200'],
    line1: 'Your gut is sending signals.',
    line2: 'Processed choices are winning the wrong battles.',
    primary: 'dualsoothe',
    secondary: 'gutheal'
  },
  cafeteria_cruiser: {
    name: 'The Cafeteria Cruiser',
    emoji: '🍽️',
    gradient: ['#56CCF2', '#2F80ED'],
    line1: 'Not bad, not optimal.',
    line2: 'Your gut has good instincts — it just needs more variety.',
    primary: 'gutsteady',
    secondary: 'gut360'
  },
  curious_explorer: {
    name: 'The Curious Explorer',
    emoji: '🔍',
    gradient: ['#A8EDEA', '#FED6E3'],
    line1: 'Something feels off but you can\'t pinpoint it.',
    line2: 'Your gut knows — you just need the map.',
    primary: 'zenup',
    secondary: 'gutsens'
  },
  aware_achiever: {
    name: 'The Aware Achiever',
    emoji: '🌿',
    gradient: ['#4CAF50', '#1B5E20'],
    line1: 'You\'re making the right moves.',
    line2: 'Your gut is responding — now let\'s go deeper.',
    primary: 'gut360',
    secondary: 'goal_based'
  },
  gut_guardian: {
    name: 'The Gut Guardian',
    emoji: '🛡️',
    gradient: ['#F7971E', '#1B2B4B'],
    line1: 'Your microbiome is thriving.',
    line2: 'You\'re in the top tier — protect what you\'ve built.',
    primary: 'gutheal',
    secondary: 'gut360'
  }
};

const PRODUCTS = {
  stresswise:  { name: 'StressWise',  url: 'https://iombio.com/shop/prebiotics/stresswise',          img: 'assets/products/stresswise.png',  type: 'prebiotic' },
  sleepeasy:   { name: 'SleepEasy',   url: 'https://iombio.com/shop/prebiotics/sleep-easy',           img: 'assets/products/sleepeasy.png',   type: 'prebiotic' },
  zenup:       { name: 'ZenUp',       url: 'https://iombio.com/shop/prebiotics/zen-up',               img: 'assets/products/zenup.png',       type: 'prebiotic' },
  gutsteady:   { name: 'GutSteady',   url: 'https://iombio.com/shop/prebiotics/gut-steady',           img: 'assets/products/gutsteady.png',   type: 'prebiotic' },
  gutease:     { name: 'GutEasy',     url: 'https://iombio.com/shop/prebiotics/gut-ease',             img: 'assets/products/gutease.png',     type: 'prebiotic' },
  dualsoothe:  { name: 'DualSoothe',  url: 'https://iombio.com/shop/prebiotics/dual-soothe/',         img: 'assets/products/dualsoothe.png',  type: 'prebiotic' },
  gut360:      { name: 'Gut360',      url: 'https://iombio.com/shop/gut-microbiome-tests/gut-360/',   img: 'assets/products/gut360.png',      type: 'test' },
  gutsens:     { name: 'GutSenS',     url: 'https://iombio.com/shop/gut-microbiome-tests/gut-sens/',  img: 'assets/products/gutsens.png',     type: 'test' },
  gutheal:     { name: 'GutHeal',     url: 'https://iombio.com/shop/gut-microbiome-tests/gut-heal',   img: 'assets/products/gutheal.png',     type: 'test' }
};

const PRODUCT_WHY = {
  stresswise:  'Your morning and afternoon choices show a cortisol-driven gut pattern. StressWise feeds the bacteria that regulate your stress response.',
  sleepeasy:   'Your dinner pattern shows your gut is active when it should be resting. SleepEasy supports the gut-brain axis that controls your sleep cycle.',
  zenup:       'Your energy crash pattern suggests your gut bacteria aren\'t producing enough B vitamins. ZenUp targets exactly this.',
  gutsteady:   'Your gut is functional but inconsistent. GutSteady builds the microbial foundation that turns good-enough into genuinely great.',
  gutease:     'Your digestive patterns show inflammation signals. GutEasy soothes and rebalances your gut lining.',
  dualsoothe:  'Your food choices show a pattern of gut disruption. DualSoothe stabilises both sides of your digestive rhythm.',
  gut360:      'You\'re making the right moves — now get the data to confirm it. Gut360 gives you a complete map of your thriving microbiome.',
  gutsens:     'Identify the exact bacteria driving your symptoms. GutSenS maps your gut sensitivity with clinical precision.',
  gutheal:     'You\'ve built something rare — a genuinely healthy gut. GutHeal maps your microbiome in clinical detail so you can protect what you\'ve built.'
};

const SECONDARY_WHY = {
  gutsens:  'Know exactly which bacteria are amplifying your signals.',
  gutheal:  'Understand the root cause — not just manage the symptoms.',
  gut360:   'Get the full 360-degree picture of your microbiome.',
  gutsteady:'Maintain the microbial diversity your gut has built.',
  stresswise:'Protect your serotonin pathway — your gut\'s most valuable output.',
  sleepeasy: 'Sustain the rhythm your gut bacteria are already building.',
  zenup:    'Sustain the energy your gut bacteria are already producing.'
};
