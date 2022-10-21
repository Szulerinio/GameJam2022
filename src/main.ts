import { loadImages } from './loadImages';
import { Player } from './player';
import { KeysPressed } from './models';
import { Camera } from './camera';

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

const camera = new Camera();
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

const gameLoop = (timestamp: number) => {
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  player.move(delta, keysPressed);
  camera.rotate(delta, keysPressed);

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  console.log(camera.rotation);

  ctx.translate(400, 400);
  ctx.rotate(camera.rotation);
  ctx.translate(-400, -400);
  ctx.drawImage(
    images.chessboard,
    -player.position.x,
    -player.position.y,
    800,
    800
  );
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.drawImage(images.player, 400 - player.size.x / 2, 400 - player.size.y);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(gameLoop);
};
gameLoop(lastTimestamp);
