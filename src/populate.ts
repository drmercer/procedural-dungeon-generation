import { DungeonMap } from './map';
import { Stepper } from './stepper';
import { Point } from './shape';

export function populateMap(map: DungeonMap, stepper: Stepper) {
  // TODO: do it for realsies
  const center = new Point(0, 0);
  map.update(center.north(10), { type: 'bagel' });
  map.update(center.south(10), { type: 'bagel' });
  map.update(center.west(10), { type: 'bagel' });
  map.update(center.east(10), { type: 'bagel' });
}
