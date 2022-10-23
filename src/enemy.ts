import { CollisionBox, DEBUGDrawMethod, DrawMethod, Rotation } from './models';
import enemyImgURL from './images/enemy.png';
import { DEBUGdrawPlaced, drawPlaced } from './drawPlaced';
import { Player } from './player';
const enemyImg = new Image();
enemyImg.src = enemyImgURL;
export class Enemy implements DrawMethod, CollisionBox, DEBUGDrawMethod {
  public position = {
    x: 200,
    y: 200
  };
  public size = {
    x: 50,
    y: 100
  };
  public image = enemyImg;
  public z = 0;
  public move = (delta: number) => {};
  public collisionBox = {
    x: 0,
    y: -20,
    r: 25
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
      this.size.x / 2,
      this.size.y,
      this.collisionBox,
      playerPosition,
      playerOnScreenPosition,
      playerRotationAngle
    );
  };
}
