function calcLunchScore(state) {
  let cats = 0, bonus = 0;
  const lb = state.lunch_base, lp = state.lunch_protein, lv = state.lunch_veg, ls = state.lunch_side;
  if (lb && lb !== 'D') cats++;
  if (lp && lp !== 'E') cats++;
  if (lv && lv !== 'D') cats++;
  if (ls && ls !== 'D') cats++;
  const baseScore = [0, 5, 10, 18, 25][cats];
  if (lb === 'C') bonus += 3;
  if (lv === 'B') bonus += 3;
  if (lv === 'C') bonus += 3;
  if (ls === 'A') bonus += 2;
  return Math.min(25, baseScore + bonus);
}

function calcBoss(state) {
  const { choice_morning, choice_afternoon, choice_dinner } = state;
  if (choice_morning === 'A' && choice_afternoon === 'A') return 'stress';
  if (choice_afternoon === 'B' && choice_dinner === 'C') return 'bloat';
  if (choice_dinner === 'D') return 'sleep';
  return 'unknown';
}

function calcPersona(state) {
  const ms = state.morning_score || 0;
  const as_ = state.afternoon_score || 0;
  const ls = state.lunch_score || 0;
  const ds = state.dinner_score || 0;
  const behavioural = ms + as_ + ls + ds;

  const r1 = state.runner1_collected || 0;
  const r2 = state.runner2_collected || 0;
  const r3 = state.runner3_collected || 0;
  const runnerTotal = r1 + r2 + r3;
  const runnerScore = Math.round((runnerTotal / 85) * 45);

  const finalScore = Math.min(100, Math.round(behavioural * 0.6 + runnerScore * 0.4));
  const boss = calcBoss(state);

  let personaKey;
  if (finalScore <= 35 && (boss === 'stress')) personaKey = 'stressed_sprinter_stress';
  else if (finalScore <= 35 && boss === 'sleep') personaKey = 'stressed_sprinter_sleep';
  else if (finalScore <= 35 && boss === 'bloat') personaKey = 'bloat_battler';
  else if (finalScore <= 35) personaKey = 'stressed_sprinter_stress';
  else if (finalScore <= 55) personaKey = 'cafeteria_cruiser';
  else if (finalScore <= 75 && boss === 'unknown') personaKey = 'curious_explorer';
  else if (finalScore <= 75) personaKey = 'aware_achiever';
  else personaKey = 'gut_guardian';

  const fiberLevel = Math.min(100, Math.round((ms + ls) / 2));
  const stressIndex = Math.min(100, Math.round(100 - (ms + as_) / 2));
  const gutDiversity = Math.min(100, Math.round(ls * 1.2));

  return { finalScore, behavioural, runnerScore, boss, personaKey, fiberLevel, stressIndex, gutDiversity };
}

function getSecondaryProduct(personaKey, goal) {
  if (personaKey === 'aware_achiever') {
    if (goal === 'mood') return 'stresswise';
    if (goal === 'immunity') return 'gutsteady';
    return 'zenup';
  }
  return PERSONAS[personaKey]?.secondary || 'gut360';
}
