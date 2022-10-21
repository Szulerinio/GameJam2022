import playerImg from './images/player.png';
export function loadImages() {
  const player = new Image();
  player.src = playerImg;
  return { player };
}
