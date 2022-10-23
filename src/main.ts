import { loadImages } from './loadImages';
import { Player } from './player';
import { KeysPressed } from './models';
import { Enemy } from './enemy';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
const ctx = canvas?.getContext('2d')!;
const keysPressed: KeysPressed = {
  a: false,
  s: false,
  d: false,
  w: false,
  q: false,
  e: false,
  n: false,
  m: false
};

const DEBUGTool = {
  collisionBox: true,
  sprite: true
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

    case 'n':
      keysPressed.n = true;
      break;
    case 'm':
      keysPressed.m = true;
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
    case 'n':
      keysPressed.n = false;
      break;
    case 'm':
      keysPressed.m = false;
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
const enemies = [
  new Enemy({ x: 2801, y: 1101 }),
  new Enemy({ x: 212, y: 1300 }),
  new Enemy({ x: 250, y: 2016 }),
  new Enemy({ x: 250, y: 2016 }),
  new Enemy({ x: 280, y: 2016 }),
  new Enemy({ x: 320, y: 2016 }),
  new Enemy({ x: 350, y: 2016 }),
  new Enemy({ x: 390, y: 2016 }),
  new Enemy({ x: 440, y: 2016 }),
  new Enemy({ x: 280, y: 2220 }),
  new Enemy({ x: 320, y: 2220 }),
  new Enemy({ x: 350, y: 2220 }),
  new Enemy({ x: 390, y: 2220 }),
  new Enemy({ x: 440, y: 2220 }),
  new Enemy({ x: 280, y: 2400 }),
  new Enemy({ x: 320, y: 2400 }),
  new Enemy({ x: 350, y: 2400 }),
  new Enemy({ x: 390, y: 2400 }),
  new Enemy({ x: 440, y: 2400 }),
  new Enemy({ x: 150, y: 150 }),
  new Enemy({ x: 120, y: 10 })
];
let objectList = [player, ...enemies];

const gameLoop = (timestamp: number) => {
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  player.move(delta, keysPressed, objectList);
  player.rotate(delta, keysPressed);
  enemies.forEach((ene) => {
    ene.move(delta, player.position, objectList);
  });
  objectList = objectList.filter((enemy) => {
    if (enemy === player) return true;
    const enemyX = enemy.position.x + enemy.collisionBox.x;
    const enemyY = enemy.position.y + enemy.collisionBox.y;
    const KiteX =
      player.position.x +
      player.kite.collisionBox.x -
      player.kite.current * player.r.sin;
    const KiteY =
      player.position.y +
      player.kite.collisionBox.y -
      player.kite.current * player.r.cos;
    const x2 = (enemyX - KiteX) ** 2;
    const y2 = (enemyY - KiteY) ** 2;
    const r2 = (enemy.collisionBox.r + player.kite.collisionBox.r) ** 2;
    // console.log(x2, y2, r2);

    return x2 + y2 > r2;
  });
  objectList.forEach((obj) => obj.recalcZ(player.r, player.position));
  objectList.sort((a, b) => {
    return a.z - b.z;
  });

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  ctx.translate(player.onScreenPosition.x, player.onScreenPosition.y);
  ctx.rotate(player.r.val);
  ctx.translate(-player.onScreenPosition.x, -player.onScreenPosition.y);
  ctx.drawImage(
    images.mapImg,
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
  player.kite.draw(ctx);
  requestAnimationFrame(gameLoop);
};
gameLoop(lastTimestamp);
