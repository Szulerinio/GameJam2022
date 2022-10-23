import {
  CollisionBox,
  DEBUGDrawMethod,
  DrawMethod,
  KeysPressed,
  Rotation
} from './models';
import playerImgURL from './images/player.png';
import kiteImgURL from './images/kite.png';
import { DEBUGdrawPlaced, drawPlaced } from './drawPlaced';
import { getIsColliding } from './helpers';
import { Enemy } from './enemy';
import { keepOutOfBuildings, returnToWorld } from './buildingsPositionBlocker';
const playerImg = new Image();
playerImg.src = playerImgURL;
const kiteImg = new Image();
kiteImg.src = kiteImgURL;
export class Player implements DrawMethod, CollisionBox, DEBUGDrawMethod {
  public position = {
    x: 2900,
    y: 700
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

  public kite = {
    img: kiteImg,
    speed: 2,
    max: 300,
    min: 40,

    size: { x: 30, y: 30 },
    collisionBox: {
      x: 0,
      y: -15,
      r: 15
    },
    current: 40,
    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.drawImage(
        this.kite.img,
        this.onScreenPosition.x - this.kite.size.x / 2,
        this.onScreenPosition.y - this.kite.current - this.kite.size.y,
        this.kite.size.x,
        this.kite.size.y
      );
      ctx.beginPath();
      ctx.moveTo(this.onScreenPosition.x - 18, this.onScreenPosition.y - 70);
      ctx.lineTo(
        this.onScreenPosition.x - this.kite.size.x / 2,
        this.onScreenPosition.y - this.kite.current
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
  };
  public rotationSpeed = 1;
  public r: Rotation = {
    val: Math.PI,
    sin: 0,
    cos: -1
  };

  public collisionBox = {
    x: 0,
    y: -25,
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
  public move = (
    delta: number,
    keysPressed: KeysPressed,
    objectList: (Player | Enemy)[]
  ) => {
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
    if (!(keysPressed.n && keysPressed.m)) {
      if (keysPressed.n) {
        if (this.kite.current > this.kite.min)
          this.kite.current -= this.kite.speed;
      }
      if (keysPressed.m) {
        if (this.kite.current < this.kite.max)
          this.kite.current += this.kite.speed;
      }
    }
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

        // console.log(sumR2, distX2);
        prev[0] += (distX - sumR * signX) * Math.sin(distX2 / sumR2);
        prev[1] += (distY - sumR * signY) * Math.sin(distY2 / sumR2);

        return prev;
      },
      [0, 0]
    );
    if (vector[0] != 0 || vector[1] != 0) {
      // console.log(vector);
    }
    this.position.x -= vector[0];
    this.position.y -= vector[1];
    this.position = keepOutOfBuildings(this.position);
    this.position = returnToWorld(this.position);
  };
}
