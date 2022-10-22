import { loadImages } from './loadImages';
import { Player } from './player';
import { KeysPressed } from './models';
import { Enemy } from './enemy';
import { drawPlaced } from './drawPlaced';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
const ctx = canvas?.getContext('2d')!;
const keysPressed: KeysPressed = {
  a: false,
  s: false,
  d: false,
  w: false,
  q: false,
  e: false
};

const DEBUGTool = {
  collisionBox: true,
  sprite: false
};

const gameWindow = {
  width: 800,
  height: 800
};

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key.toLowerCase()) {
    case 'a':
      keysPressed.a = true;
      break;
    case 'd':
      keysPressed.d = true;
      break;
    case 's':
      keysPressed.s = true;
      break;
    case 'w':
      keysPressed.w = true;
      break;
    case 'q':
      keysPressed.q = true;
      break;
    case 'e':
      keysPressed.e = true;
      break;
    default:
      break;
  }
};

const onKeyUp = (e: KeyboardEvent) => {
  switch (e.key.toLowerCase()) {
    case 'a':
      keysPressed.a = false;
      break;
    case 'd':
      keysPressed.d = false;
      break;
    case 's':
      keysPressed.s = false;
      break;
    case 'w':
      keysPressed.w = false;
      break;
    case 'q':
      keysPressed.q = false;
      break;
    case 'e':
      keysPressed.e = false;
      break;
    default:
      break;
  }
};
const onMouseDown = () => {};
const onMouseUp = () => {};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
// document.addEventListener('mousemove', ()=>{})

let lastTimestamp = 0;
const images = loadImages();

const player = new Player();
const enemy = new Enemy();
const objectList = [player, enemy];

const gameLoop = (timestamp: number) => {
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  player.move(delta, keysPressed);
  player.rotate(delta, keysPressed);

  objectList.forEach((obj) => obj.recalcZ(player.r, player.position));
  objectList.sort((a, b) => {
    return a.z - b.z;
  });

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  ctx.translate(player.onScreenPosition.x, player.onScreenPosition.y);
  ctx.rotate(player.r.val);
  ctx.translate(-player.onScreenPosition.x, -player.onScreenPosition.y);
  ctx.drawImage(
    images.chessboardImg,
    0 - player.position.x + player.onScreenPosition.x,
    0 - player.position.y + player.onScreenPosition.y
  );

  objectList.forEach((obj) => {
    DEBUGTool.sprite &&
      obj.draw(ctx, player.position, player.onScreenPosition, player.r.val);
    DEBUGTool.collisionBox &&
      obj.DEBUGdraw(
        ctx,
        player.position,
        player.onScreenPosition,
        player.r.val
      );
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(gameLoop);
};
gameLoop(lastTimestamp);
