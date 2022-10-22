import { Rotation } from './models';

export class Enemy {
  public position = {
    x: 200,
    y: 200
  };
  public size = {
    x: 50,
    y: 100
  };
  public z = 0;
  public move = (delta: number) => {};
  public recalcZ = (rotation: Rotation) => {
    this.z = this.position.y * rotation.cos + this.position.x * rotation.sin;
  };
}
