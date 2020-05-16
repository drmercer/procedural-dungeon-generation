let seed = Date.now();

// Seeded random function

// From http://indiegamr.com/generate-repeatable-random-numbers-in-js/
export function nextRandom(max?: number, min?: number) {
  max = max || 1;
  min = min || 0;

  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;

  return min + rnd * (max - min);
}

export function setSeed(newSeed: number) {
  seed = newSeed;
}
