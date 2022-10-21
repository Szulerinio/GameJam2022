import { KeysPressed } from './models';

export class Camera {
  public rotation = 0;
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
        this.rotation += delta * this.speed;
      }
      if (keysPressed.e) {
        this.rotation -= delta * this.speed;
      }
    }
  };
}
