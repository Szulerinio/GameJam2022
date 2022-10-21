import { setupCounter } from './counter';

const canvas = document.querySelector<HTMLDivElement>('#canvas');

const keysPressed = {
  a: true,
  s: true,
  d: true,
  w: true
};

const onKeyDown = (e: KeyboardEvent) => {
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

const onKeyUp = (e: KeyboardEvent) => {
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
const onMouseDown = () => {
  console.log('aaa');
};
const onMouseUp = () => {
  console.log('aaa');
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
// document.addEventListener('mousemove', ()=>{})

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const render = () => {};
