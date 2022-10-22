import chessboardImgURL from './images/chessboard.png';
export function loadImages() {
  const chessboardImg = new Image();
  chessboardImg.src = chessboardImgURL;
  return { chessboardImg };
}
