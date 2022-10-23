import { Player } from './player';

export interface building {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

//########################################################
const building1: building = {
  top: 0,
  left: 0,
  right: 980,
  bottom: 850
};
const building2: building = {
  top: 0,
  left: 1560,
  right: 1795,
  bottom: 880
};
const building2_1: building = {
  top: 685,
  left: 1560,
  right: 1875,
  bottom: 880
};
const building3: building = {
  top: 628,
  left: 2065,
  right: 2377,
  bottom: 895
};

const building4: building = {
  top: 87,
  left: 2542,
  right: 2870,
  bottom: 925
};
const building5: building = {
  top: 0,
  left: 3060,
  right: 3340,
  bottom: 930
};
const building6: building = {
  top: 1640,
  left: 540,
  right: 890,
  bottom: 2550
};
const building6_1: building = {
  top: 2380,
  left: 0,
  right: 890,
  bottom: 2550
};

const building7: building = {
  top: 1500,
  left: 1380,
  right: 1710,
  bottom: 1573
};
const building8: building = {
  top: 1540,
  left: 2000,
  right: 2285,
  bottom: 2550
};
const building9: building = {
  top: 1565,
  left: 2600,
  right: 2875,
  bottom: 1852
};
const building10: building = {
  top: 1480,
  left: 3100,
  right: 3435,
  bottom: 2550
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

const buildings = [
  building1,
  building2,
  building2_1,
  building3,
  building4,
  building5,
  building6,
  building6_1,
  building7,
  building8,
  building9,
  building10
];
export const keepOutOfBuildings = (
  position: Player['position']
): Player['position'] => {
  const newPosition: Player['position'] = { x: position.x, y: position.y };
  buildings.forEach((bldng) => {
    if (
      newPosition.x > bldng.left &&
      newPosition.x < bldng.right &&
      newPosition.y > bldng.top &&
      newPosition.y < bldng.bottom
    ) {
      const przekatna = (bldng.bottom - bldng.top) / (bldng.right - bldng.left);
      console.log('przekatna', przekatna);

      //lewydol true /prawydol false
      const isPrawaGora =
        (newPosition.x - bldng.left) * przekatna > newPosition.y - bldng.top;
      const isLewaGora =
        bldng.bottom - (newPosition.x - bldng.left) * przekatna > newPosition.y;
      console.log(isPrawaGora, isLewaGora);

      if (isPrawaGora && isLewaGora) newPosition.y = bldng.top;
      if (isPrawaGora && !isLewaGora) newPosition.x = bldng.right;
      if (!isPrawaGora && isLewaGora) newPosition.x = bldng.left;
      if (!isPrawaGora && !isLewaGora) newPosition.y = bldng.bottom;
    }
  });
  return newPosition;
};
