import { Rotation } from './models';
import enemyImgURL from './images/enemy.png';
const enemyImg = new Image();
enemyImg.src = enemyImgURL;
export class Enemy {
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
  public recalcZ = (rotation: Rotation) => {
    this.z = this.position.y * rotation.cos + this.position.x * rotation.sin;
  };
}
