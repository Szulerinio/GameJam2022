import playerImg from './images/player.png';
import chessboardImg from './images/chessboard.png';
import enemyImg from './images/enemy.png';
export function loadImages() {
  const player = new Image();
  player.src = playerImg;
  const chessboard = new Image();
  chessboard.src = chessboardImg;
  const enemy = new Image();
  enemy.src = enemyImg;

  return { player, chessboard, enemy };
}
