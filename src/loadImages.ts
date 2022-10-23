import chessboardImgURL from './images/chessboard.png';
import mapImgURL from './images/map.png';
export function loadImages() {
  const chessboardImg = new Image();
  chessboardImg.src = chessboardImgURL;
  const mapImg = new Image();
  mapImg.src = mapImgURL;
  return { chessboardImg, mapImg };
}
