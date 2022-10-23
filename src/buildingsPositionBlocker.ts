import { Player } from './player';

export interface building {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const world1: building = {
  top: -200,
  left: -200,
  right: 5200,
  bottom: 0
};
const world2: building = {
  top: 5000,
  left: -200,
  right: 5200,
  bottom: 2750
};
const world3: building = {
  top: 0,
  left: -200,
  right: 5200,
  bottom: -200
};
const world4: building = {
  top: -200,
  left: -200,
  right: 0,
  bottom: 2750
};

const building1: building = {
  top: 0,
  left: 0,
  right: 980,
  bottom: 850
};
const building2: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building3: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building4: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building5: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building6: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building7: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building8: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building9: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const building10: building = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
export const world = { width: 5000, height: 2550 };
export const returnToWorld = (
  position: Player['position']
): Player['position'] => {
  const newPosition: Player['position'] = { x: position.x, y: position.y };
  if (newPosition.x < 0) newPosition.x = 0;
  if (newPosition.x > 5000) newPosition.x = 5000;
  if (newPosition.y < 0) newPosition.y = 0;
  if (newPosition.y > 2550) newPosition.y = 2550;
  return newPosition;
};
