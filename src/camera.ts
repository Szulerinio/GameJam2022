import { KeysPressed } from './models';

export class Camera {
  public r = {
    val: 0,
    sin: 0,
    cos: 1
  };
  public speed = 1;
  public min = { x: 0, y: 0 };
  public max = { x: 1500, y: 1500 };

  //   move = (delta: number, keysPressed: KeysPressed) => {
  //     if (!(keysPressed.q && keysPressed.e)) {
  //       if (keysPressed.q) {
  //         this.rotation += delta * this.speed;
  //       }
  //       if (keysPressed.e) {
  //         this.rotation += delta * this.speed;
  //       }
  //     }
  //   };

  rotate = (delta: number, keysPressed: KeysPressed) => {
    if (!(keysPressed.q && keysPressed.e)) {
      if (keysPressed.q) {
        this.r.val += delta * this.speed;
      }
      if (keysPressed.e) {
        this.r.val -= delta * this.speed;
      }
      this.r.cos = Math.cos(this.r.val);
      this.r.sin = Math.sin(this.r.val);
    }
  };
}
