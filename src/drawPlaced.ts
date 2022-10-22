import { Player } from './player';

/**
 * @param ctx canvas context
 * @param img image to be drawn
 * @param x x position where thing has to be placed
 * @param y y position where thing has to be placed
 * @param rotationOffsetX distance from left side to position point of image - usually half width
 * @param rotationOffsetY distance from top side to  position point of image - usually full height
 **/
export const drawPlaced = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  rotationOffsetX: number,
  rotationOffsetY: number,
  player: Player
) => {
  const baseTransform = ctx.getTransform();
  ctx.translate(
    x + player.onScreenPosition.x - player.position.x,
    y + player.onScreenPosition.y - player.position.y
  );

  ctx.rotate(-player.r.val);
  ctx.drawImage(img, -rotationOffsetX, -rotationOffsetY);
  ctx.setTransform(baseTransform);
};
