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

const gameLoop = (timestamp: number) => {
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  player.move(delta, keysPressed);
  player.rotate(delta, keysPressed);

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);

  ctx.translate(player.onScreenPosition.x, player.onScreenPosition.y);
  ctx.rotate(player.r.val);
  ctx.translate(-player.onScreenPosition.x, -player.onScreenPosition.y);

  ctx.drawImage(
    images.chessboard,
    0 - player.position.x + player.onScreenPosition.x,
    0 - player.position.y + player.onScreenPosition.y
  );

  drawPlaced(
    ctx,
    images.enemy,
    enemy.position.x,
    enemy.position.y,
    enemy.size.x / 2,
    enemy.size.y,
    player
  );

  ctx.translate(
    enemy.position.x + player.onScreenPosition.x - player.position.x,
    enemy.position.y + player.onScreenPosition.y - player.position.y
  );

  ctx.rotate(-player.r.val);
  ctx.drawImage(images.enemy, -enemy.size.x / 2, -enemy.size.y);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(
    images.player,
    player.onScreenPosition.x - player.size.x / 2,
    player.onScreenPosition.y - player.size.y
  );

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(gameLoop);
};
gameLoop(lastTimestamp);
