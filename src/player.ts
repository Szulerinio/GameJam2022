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

  public rotationSpeed = 1;
  public r = {
    val: 0,
    sin: 0,
    cos: 1
  };
  public rotate = (delta: number, keysPressed: KeysPressed) => {
    if (!(keysPressed.q && keysPressed.e)) {
      if (keysPressed.q) {
        this.r.val += delta * this.rotationSpeed;
      }
      if (keysPressed.e) {
        this.r.val -= delta * this.rotationSpeed;
      }
      this.r.cos = Math.cos(this.r.val);
      this.r.sin = Math.sin(this.r.val);
    }
  };

  public move = (delta: number, keysPressed: KeysPressed) => {
    if (!(keysPressed.a && keysPressed.d)) {
      if (keysPressed.a) {
        this.position.x -= delta * this.speed * this.r.cos;
        this.position.y -= delta * this.speed * -this.r.sin;
      }
      if (keysPressed.d) {
        this.position.x += delta * this.speed * this.r.cos;
        this.position.y += delta * this.speed * -this.r.sin;
      }
    }
    if (!(keysPressed.w && keysPressed.s)) {
      if (keysPressed.w) {
        this.position.y -= delta * this.speed * this.r.cos;
        this.position.x -= delta * this.speed * this.r.sin;
      }
      if (keysPressed.s) {
        this.position.y += delta * this.speed * this.r.cos;
        this.position.x += delta * this.speed * this.r.sin;
      }
    }
  };
}
