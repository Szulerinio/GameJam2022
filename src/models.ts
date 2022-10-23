import { Player } from './player';

export interface KeysPressed {
  a: boolean;
  s: boolean;
  d: boolean;
  w: boolean;

  q: boolean;
  e: boolean;

  n: boolean;
  m: boolean;
}
export interface Rotation {
  val: number;
  sin: number;
  cos: number;
}

export interface DrawMethod {
  draw: (
    ctx: CanvasRenderingContext2D,
    playerPosition: Player['position'],
    playerOnScreenPosition: Player['onScreenPosition'],
    playerRotationAngle: number
  ) => void;
}
export interface DEBUGDrawMethod {
  DEBUGdraw: (
    ctx: CanvasRenderingContext2D,
    playerPosition: Player['position'],
    playerOnScreenPosition: Player['onScreenPosition'],
    playerRotationAngle: number
  ) => void;
}
export interface CollisionBox {
  /**
   *    @property {number} x - distance to center of collisionbox from position x (usually 0)
   *    @property {number} y - distance to center of collisionbox from position y (usually r)
   *    @property {number} r -radious (usually half widht)
   *    @info This is circle cause boxes are harder
   */
  collisionBox: {
    x: number;
    y: number;
    r: number;
  };
}
