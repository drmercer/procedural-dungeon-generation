import { DungeonMap } from './map';
import { Stepper } from './stepper';
import { Point, Box } from './shape';
import { Random } from './util/random';

const MAX_ROOM_SIZE = 9;

const MIN_ROOM_SIZE = 3;

//These are each split into two different halves so that the bounds can be respected even if they're odd.
const FIRST_HALF_MAX_ROOM_SIZE = Math.floor(MAX_ROOM_SIZE/2);
const SECOND_HALF_MAX_ROOM_SIZE = Math.ceil(MAX_ROOM_SIZE/2);
const FIRST_HALF_MIN_ROOM_SIZE = Math.floor(MIN_ROOM_SIZE/2);
const SECOND_HALF_MIN_ROOM_SIZE = Math.ceil(MIN_ROOM_SIZE/2);

export async function populateMap(map: DungeonMap, stepper: Stepper) {
  const rand = new Random(123456);
  await placeRooms(map, stepper, rand, 200);
}

function getRandomBox(rand: Random): Box {
  return {
    w: rand.nextInt(FIRST_HALF_MAX_ROOM_SIZE, FIRST_HALF_MIN_ROOM_SIZE) +
      rand.nextInt(SECOND_HALF_MAX_ROOM_SIZE, SECOND_HALF_MIN_ROOM_SIZE),
    h: rand.nextInt(FIRST_HALF_MAX_ROOM_SIZE, FIRST_HALF_MIN_ROOM_SIZE) +
      rand.nextInt(SECOND_HALF_MAX_ROOM_SIZE, SECOND_HALF_MIN_ROOM_SIZE),
    x: rand.nextInt(),
    y: rand.nextInt(),
  }
}

async function placeRooms(map: DungeonMap, stepper: Stepper, rand: Random, nAttempts: number) {
  for (let i = 0; i < nAttempts; i++) {
    const roomBox = getRandomBox(rand);
    if (canPlaceRoom(map, roomBox)) {
      placeRoom(map, roomBox);
      await stepper.tick();
    }
  }
}

function canPlaceRoom(map: DungeonMap, box: Box) {
  const xMin = box.x - 1;
  const xMax = box.x + box.w + 1;
  const yMin = box.y - 1;
  const yMax = box.y + box.h + 1;
  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      if (map.get(new Point(x, y)).type !== 'wall') {
        return false;
      }
    }
  }
  return true;
}

function placeRoom(map: DungeonMap, box: Box): void {
  for (let x = box.x; x < box.x + box.w; x++) {
    for (let y = box.y; y < box.y + box.h; y++) {
      map.update(new Point(x, y), {type: 'room'});
    }
  }
}