import { DungeonMap, Tile } from './map';
import { Point } from './shape';
import { ensureNotNull } from "./util/assert";
import { Stepper, AnimationStepper } from './stepper';
import { Goal } from './feature';
import { renderMap } from './render';

const canvas = ensureNotNull(document.querySelector('canvas'));
const ctx: CanvasRenderingContext2D = ensureNotNull(canvas.getContext('2d'));

const goBtn: HTMLButtonElement = ensureNotNull(document.querySelector('#go'));

// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 200, 200);

const map = new DungeonMap({ type: 'wall' });
const stepper = new AnimationStepper();

goBtn.onclick = async function () {
  // await populateMap(map, stepper);
  map.update(new Point(10, 10), { type: 'bagel' });
  map.update(new Point(-10, 10), { type: 'bagel' });
  map.update(new Point(-10, -10), { type: 'bagel' });
  map.update(new Point(10, -10), { type: 'bagel' });
  await renderMap(ctx, map, tile => {
    switch (tile.type) {
      case 'wall': return 'brown';
      case 'bagel': return 'tan';
      default: return 'orange';
    }
  });
}
