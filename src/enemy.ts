import { CollisionBox, DEBUGDrawMethod, DrawMethod, Rotation } from './models';
import enemyImgURL from './images/enemy.png';
import { DEBUGdrawPlaced, drawPlaced } from './drawPlaced';
import { Player } from './player';
import { getIsColliding } from './helpers';
const enemyImg = new Image();
enemyImg.src = enemyImgURL;
export class Enemy implements DrawMethod, CollisionBox, DEBUGDrawMethod {
  constructor(position: Enemy['position']) {
    this.position = position;
  }
  public position = {
    x: 200,
    y: 200
  };
  public size = {
    x: 40,
    y: 49
  };
  public collisionBox = {
    x: 0,
    y: -25,
    r: 25
  };
  private speed = 90;
  public image = enemyImg;
  public z = 0;
  public move = (
    delta: number,
    target: Player['position'],
    objectList: (Player | Enemy)[]
  ) => {
    const x = this.position.x - target.x;
    const y = this.position.y - target.y;
    const xsign = x < 0 ? -1 : 1;
    const ysign = y < 0 ? -1 : 1;
    const x2 = x * x;
    const y2 = y * y;
    const r2 = x2 + y2;
    this.position.x -= xsign * ((this.speed * (r2 - y2)) / r2) * delta;
    this.position.y -= ysign * ((this.speed * (r2 - x2)) / r2) * delta;

    const filtered = objectList.filter((obj) => {
      if (this === obj) {
        return false;
      }
      return getIsColliding(
        this.position,
        this.collisionBox,
        obj.position,
        obj.collisionBox
      );
    });
    const vector = filtered.reduce(
      (prev, curr) => {
        const distX =
          this.position.x +
          this.collisionBox.x -
          (curr.position.x + curr.collisionBox.x);
        const signX = distX < 0 ? -1 : 1;
        const distX2 = distX ** 2;
        const distY =
          this.position.y +
          this.collisionBox.y -
          (curr.position.y + curr.collisionBox.y);
        const signY = distY < 0 ? -1 : 1;
        const distY2 = distY ** 2;
        const sumR = this.collisionBox.r + curr.collisionBox.r;
        const sumR2 = sumR ** 2;

        console.log(sumR2, distX2);
        prev[0] += (distX - sumR * signX) * Math.sin(distX2 / sumR2);
        prev[1] += (distY - sumR * signY) * Math.sin(distY2 / sumR2);

        return prev;
      },
      [0, 0]
    );
    if (vector[0] != 0 || vector[1] != 0) {
      console.log(vector);
    }
    this.position.x -= vector[0];
    this.position.y -= vector[1];
  };

  public recalcZ = (rotation: Rotation, playerPosition: Player['position']) => {
    this.z =
      (this.position.y - playerPosition.y) * rotation.cos +
      (this.position.x - playerPosition.x) * rotation.sin;
  };

  public draw = (
    ctx: CanvasRenderingContext2D,
    playerPosition: Player['position'],
    playerOnScreenPosition: Player['onScreenPosition'],
    playerRotationAngle: number
  ) => {
    drawPlaced(
      ctx,
      this.image,
      this.position.x,
      this.position.y,
      this.size.x / 2,
      this.size.y,
      playerPosition,
      playerOnScreenPosition,
      playerRotationAngle
    );
  };

  public DEBUGdraw = (
    ctx: CanvasRenderingContext2D,
    playerPosition: Player['position'],
    playerOnScreenPosition: Player['onScreenPosition'],
    playerRotationAngle: number
  ) => {
    DEBUGdrawPlaced(
      ctx,
      this.position.x,
      this.position.y,
      this.collisionBox,
      playerPosition,
      playerOnScreenPosition,
      playerRotationAngle
    );
  };
}
