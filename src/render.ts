import { DungeonMap } from "./map";

export async function renderMap(context: CanvasRenderingContext2D, map: DungeonMap) {
  const bounds = map.measure();
  // TODO compute tile size based on canvas size and bounds.
  context.canvas.width
}
