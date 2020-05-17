import { DungeonMap, Tile } from './map';
import { ensureNotNull } from "./util/assert";
import { AnimationStepper } from './stepper';
import { renderMap } from './render';
import { populateMap } from './populate';
import { strToColor } from './util/color';

const canvas = ensureNotNull(document.querySelector('canvas'));
const ctx: CanvasRenderingContext2D = ensureNotNull(canvas.getContext('2d'));

const goBtn: HTMLButtonElement = ensureNotNull(document.querySelector('#go'));

function tileColor(tile: Tile) {
  switch (tile.type) {
    case 'wall': return 'brown';
    case 'bagel': return 'tan';
    default: return strToColor(tile.type);
  }
}

goBtn.onclick = async function () {
  const map = new DungeonMap({ type: 'wall' });
  const stepper = new AnimationStepper(() => renderMap(ctx, map, tileColor));
  await populateMap(map, stepper);
  await renderMap(ctx, map, tileColor);
}
