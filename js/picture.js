import {viewPicture} from './fullsizeView.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = picture.content;
const documentFragment = document.createDocumentFragment();
function createPicture({url, description, comments, likes}){
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  return picture;
}


function addViewPictureListener(picture){
  picture.addEventListener('click', () => {
    viewPicture(picture);
  });
}

function renderPictures(pictures){
  pictures.forEach((picture) => {
    documentFragment.append(createPicture(picture));
  });
  picturesContainer.appendChild(documentFragment);
  picturesContainer.querySelectorAll('.picture').forEach((picture) =>{
    addViewPictureListener(picture);
  });
}

export {renderPictures};
