// Seeded PRNG

export class Random {
  constructor(
    private seed: number = Date.now(),
  ) {
  }

  // From http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  public next(max: number = 1, min: number = 0) {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;

    return min + rnd * (max - min);
  }
}