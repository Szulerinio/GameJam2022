import {
  CollisionBox,
  DEBUGDrawMethod,
  DrawMethod,
  KeysPressed,
  Rotation
} from './models';
import playerImgURL from './images/player.png';
import { DEBUGdrawPlaced, drawPlaced } from './drawPlaced';
const playerImg = new Image();
playerImg.src = playerImgURL;
export class Player implements DrawMethod, CollisionBox, DEBUGDrawMethod {
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
  public z = 0;
  public speed = 150;

  public rotationSpeed = 1;
  public r: Rotation = {
    val: 0,
    sin: 0,
    cos: 1
  };

  public collisionBox = {
    x: this.size.x / 2,
    y: 70,
    r: 25
  };

  public recalcZ = () => {};
  public draw = (
    ctx: CanvasRenderingContext2D,
    playerPosition: { x: number; y: number },
    playerOnScreenPosition: { x: number; y: number },
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
    playerPosition: { x: number; y: number },
    playerOnScreenPosition: { x: number; y: number },
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
  public image = playerImg;
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
