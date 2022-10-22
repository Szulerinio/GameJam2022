import { Player } from './player';

/**
 * @param ctx canvas context
 * @param img image to be drawn
 * @param x x position where thing has to be placed
 * @param y y position where thing has to be placed
 * @param rotationOffsetX distance from left side to position point of image - usually half width
 * @param rotationOffsetY distance from top side to  position point of image - usually full height
 * @param playerPosition position of player
 * @param playerOnScreenPosition position of player on screen usually(400,400)
 * @param playerRotationAngle angle to rotate back = 0 for player? player.r.val for other
 **/
export const drawPlaced = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  rotationOffsetX: number,
  rotationOffsetY: number,
  playerPosition: Player['position'],
  playerOnScreenPosition: Player['onScreenPosition'],
  playerRotationAngle: number
) => {
  const baseTransform = ctx.getTransform();
  ctx.translate(
    x + playerOnScreenPosition.x - playerPosition.x,
    y + playerOnScreenPosition.y - playerPosition.y
  );

  ctx.rotate(-playerRotationAngle);
  ctx.drawImage(img, -rotationOffsetX, -rotationOffsetY);
  ctx.setTransform(baseTransform);
};

/**
 * @param ctx canvas context
 * @param x x position where thing has to be placed
 * @param y y position where thing has to be placed
 * @param rotationOffsetX distance from left side to position point of image - usually half width
 * @param rotationOffsetY distance from top side to  position point of image - usually full height
 * @param hitbox circle of the hitbox
 * @param playerPosition position of player
 * @param playerOnScreenPosition position of player on screen usually(400,400)
 * @param playerRotationAngle angle to rotate back = 0 for player? player.r.val for other
 **/
export const DEBUGdrawPlaced = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotationOffsetX: number,
  rotationOffsetY: number,
  collisionBox: { x: number; y: number; r: number },
  playerPosition: Player['position'],
  playerOnScreenPosition: Player['onScreenPosition'],
  playerRotationAngle: number
) => {
  const baseTransform = ctx.getTransform();
  ctx.translate(
    x + playerOnScreenPosition.x - playerPosition.x,
    y + playerOnScreenPosition.y - playerPosition.y
  );

  ctx.rotate(-playerRotationAngle);
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.arc(
    -rotationOffsetX + collisionBox.x,
    -rotationOffsetY + collisionBox.y,
    collisionBox.r,
    0,
    2 * Math.PI,
    false
  );

  ctx.stroke();
  ctx.setTransform(baseTransform);
};
