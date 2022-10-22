import { KeysPressed } from './models';

export class Player {
  public position = {
    x: 0,
    y: 0
  };
  public onScreenPosition = {
    x: 400,
    y: 400
  };
  public size = {
    x: 50,
    y: 100
  };
  public speed = 150;

  public move = (
    delta: number,
    keysPressed: KeysPressed,
    rotation: { val: number; sin: number; cos: number }
  ) => {
    if (!(keysPressed.a && keysPressed.d)) {
      if (keysPressed.a) {
        this.position.x -= delta * this.speed * rotation.cos;
        this.position.y -= delta * this.speed * -rotation.sin;
      }
      if (keysPressed.d) {
        this.position.x += delta * this.speed * rotation.cos;
        this.position.y += delta * this.speed * -rotation.sin;
      }
    }
    if (!(keysPressed.w && keysPressed.s)) {
      if (keysPressed.w) {
        this.position.y -= delta * this.speed * rotation.cos;
        this.position.x -= delta * this.speed * rotation.sin;
      }
      if (keysPressed.s) {
        this.position.y += delta * this.speed * rotation.cos;
        this.position.x += delta * this.speed * rotation.sin;
      }
    }
  };
}
