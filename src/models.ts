import { Player } from './player';

export interface KeysPressed {
  a: boolean;
  s: boolean;
  d: boolean;
  w: boolean;

  q: boolean;
  e: boolean;
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
