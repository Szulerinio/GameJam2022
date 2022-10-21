import { loadImages } from './loadImages';
import { Player } from './player';
import { KeysPressed } from './models';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
const ctx = canvas?.getContext('2d')!;
const keysPressed: KeysPressed = {
  a: true,
  s: true,
  d: true,
  w: true
};

const gameWindow = {
  width: 800,
  height: 800
};

const onKeyUp = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'a':
    case 'A':
      keysPressed.a = true;
      break;
    case 'd':
    case 'D':
      keysPressed.d = true;
      break;
    case 's':
    case 'S':
      keysPressed.s = true;
      break;
    case 'w':
    case 'W':
      keysPressed.w = true;
      break;
    default:
      break;
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'a':
    case 'A':
      keysPressed.a = false;
      break;
    case 'd':
    case 'D':
      keysPressed.d = false;
      break;
    case 's':
    case 'S':
      keysPressed.s = false;
      break;
    case 'w':
    case 'W':
      keysPressed.w = false;
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

const gameLoop = (timestamp: number) => {
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  player.move(delta, keysPressed);
  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  ctx.drawImage(images.player, player.position.x, player.position.y);

  requestAnimationFrame(gameLoop);
};
gameLoop(lastTimestamp);
