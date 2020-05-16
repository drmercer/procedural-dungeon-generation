import { DungeonMap } from './map';
import { ensureNotNull } from "./util/assert";
import { AnimationStepper } from './stepper';
import { renderMap } from './render';
import { populateMap } from './populate';

const canvas = ensureNotNull(document.querySelector('canvas'));
const ctx: CanvasRenderingContext2D = ensureNotNull(canvas.getContext('2d'));

const goBtn: HTMLButtonElement = ensureNotNull(document.querySelector('#go'));

const map = new DungeonMap({ type: 'wall' });
const stepper = new AnimationStepper();

goBtn.onclick = async function () {
  await populateMap(map, stepper);
  await renderMap(ctx, map, tile => {
    switch (tile.type) {
      case 'wall': return 'brown';
      case 'bagel': return 'tan';
      default: return 'orange';
    }
  });
}
