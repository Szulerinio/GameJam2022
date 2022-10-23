import { CollisionBox } from './models';
import { Player } from './player';

export const getIsColliding = (
  aPosition: Player['position'],
  aCollisionBox: CollisionBox['collisionBox'],
  bPosition: Player['position'],
  bCollisionBox: CollisionBox['collisionBox']
) => {
  const x2 =
    (aPosition.x - aCollisionBox.x - (bPosition.x - bCollisionBox.x)) ** 2;
  const y2 =
    (aPosition.y - aCollisionBox.y - (bPosition.y - bCollisionBox.y)) ** 2;
  const r2 = (aCollisionBox.r + bCollisionBox.r) ** 2;

  return r2 >= x2 + y2;
};
