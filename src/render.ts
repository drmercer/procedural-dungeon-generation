import { DungeonMap, Tile } from "./map";
import { Box, Point } from "./shape";

export type TileColorFn = (tile: Tile) => string;

const minMapSize = 20;

export async function renderMap(
  context: CanvasRenderingContext2D,
  map: DungeonMap,
  colorFn: TileColorFn,
) {
  const bounds = map.measure();
  const tileSizePx = Math.min(
    context.canvas.width / Math.max(bounds.w, minMapSize),
    context.canvas.height / Math.max(bounds.h, minMapSize),
  );

  // Clear canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  // Draw default tiles
  drawArea(context, bounds, tileSizePx, bounds, colorFn(map.defaultTile));
  
  // Draw contents
  map.forEachNonDefaultTile((tile, pt) => {
    const color = colorFn(tile);
    drawPoint(context, bounds, tileSizePx, pt, color);
  });
}

function drawPoint(
  context: CanvasRenderingContext2D,
  bounds: Box,
  tileSizePx: number,
  pt: Point,
  fillStyle: string,
) {
  const area = {
    x: pt.x,
    y: pt.y,
    w: 1,
    h: 1,
  }
  drawArea(context, bounds, tileSizePx, area, fillStyle);
}

function drawArea(
  context: CanvasRenderingContext2D,
  bounds: Box,
  tileSizePx: number,
  area: Box,
  fillStyle: string,
) {
  context.fillStyle = fillStyle;
  const x = area.x - bounds.x;
  const y = area.y - bounds.y;
  const w = area.w;
  const h = area.h;
  context.fillRect(
    x * tileSizePx,
    y * tileSizePx,
    w * tileSizePx,
    h * tileSizePx,
  )
}
