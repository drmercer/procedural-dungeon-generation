import { DungeonMap, Tile } from "./map";
import { Box, Point } from "./shape";

export type TileColorFn = (tile: Tile) => string;

export async function renderMap(context: CanvasRenderingContext2D, map: DungeonMap, colorFn: TileColorFn) {
  const bounds = map.measure();
  const tileSizePx = Math.min(
    context.canvas.width / bounds.w,
    context.canvas.height / bounds.h,
  );
  drawArea(context, bounds, tileSizePx, bounds, colorFn(map.defaultTile));
  map.forEachNonDefaultTile((tile, pt) => {
    const color = colorFn(tile);
    drawPoint(context, bounds, tileSizePx, pt, color);
  });
}

function drawPoint(context: CanvasRenderingContext2D, bounds: Box, tileSizePx: number, pt: Point, fillStyle: string) {
  const area = {
    x: pt.x,
    y: pt.y,
    w: 1,
    h: 1,
  }
  drawArea(context, bounds, tileSizePx, area, fillStyle);
}

function drawArea(context: CanvasRenderingContext2D, bounds: Box, tileSizePx: number, area: Box, fillStyle: string) {
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
