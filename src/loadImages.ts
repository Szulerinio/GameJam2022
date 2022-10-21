import playerImg from './images/player.png';
import chessboardImg from './images/chessboard.png';
export function loadImages() {
  const player = new Image();
  player.src = playerImg;
  const chessboard = new Image();
  chessboard.src = chessboardImg;

  return { player, chessboard };
}
