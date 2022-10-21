export class Player {
  public position = {
    x: 0,
    y: 0
  };
  public size = {
    x: 50,
    y: 100
  };
  public speed = 150;

  public move = (delta: number, keysPressed: any) => {
    if (!(keysPressed.a && keysPressed.d)) {
      if (keysPressed.a) {
        this.position.x -= delta * this.speed;
      }
      if (keysPressed.d) {
        this.position.x += delta * this.speed;
      }
    }
    if (!(keysPressed.w && keysPressed.s)) {
      if (keysPressed.w) {
        this.position.y -= delta * this.speed;
      }
      if (keysPressed.s) {
        this.position.y += delta * this.speed;
      }
    }
  };
}
