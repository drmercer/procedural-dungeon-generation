import { DungeonMap } from './map';
import { Stepper } from './stepper';
import { Point } from './shape';
import { Random } from './util/random';

export async function populateMap(map: DungeonMap, stepper: Stepper) {
  // TODO: do it for realsies
  const rand = new Random(123456);
  const center = new Point(0, 0);
  await stepper.tick();
  map.update(center.north(10), { type: 'bagel' });
  await stepper.tick();
  map.update(center.south(10), { type: 'bagel' });
  await stepper.tick();
  map.update(center.west(10), { type: 'bagel' });
  await stepper.tick();
  map.update(center.east(10), { type: 'bagel' });
  await stepper.tick();

  for (let i = 0; i < 1000; i++) {
    const pt = center.plus(rand.nextInt(100, -100), rand.nextInt(100, -100));
    map.update(pt, { type: 'randoooooom' });
    await stepper.tick();
  }
}
