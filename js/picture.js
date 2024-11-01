import {viewPicture} from './fullsizeView.js';

const picturesContainer = document.querySelector('.pictures.container');
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


function viewPictureListener(evt){
  if(evt.target.matches('.picture__img')){
    viewPicture(evt.target.closest('.picture'));
  }
}

function renderPictures(pictures){
  pictures.forEach((picture) => {
    documentFragment.append(createPicture(picture));
  });
  picturesContainer.appendChild(documentFragment);
  picturesContainer.addEventListener('click', viewPictureListener);
}

export {renderPictures};
