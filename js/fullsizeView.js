import {pictures} from './data.js';
import {isEscapeKey, isEnterKey} from './utils.js';

const imageViewiengWindowOverlay = document.querySelector('.big-picture, overlay');
console.log(imageViewiengWindowOverlay);
const imageViewiengWindow = document.querySelector('.big-picture');
const viewiengWindowImg = imageViewiengWindow.querySelector('.big-picture__img img');
const viewiengWindowClose = imageViewiengWindow.querySelector('.big-picture__cancel');
const likesCount = imageViewiengWindow.querySelector('.likes-count');
const commentsCount = imageViewiengWindow.querySelector('.comments-count');
const socialDescription = imageViewiengWindow.querySelector('.social__caption');
const socialCommentsCount = imageViewiengWindow.querySelector('.social__comment-count');
const socialComments = imageViewiengWindow.querySelector('.social__comments');
const socialCommentsLoader = imageViewiengWindow.querySelector('.comments-loader');


function createCommentElement({avatar, name, message}){
  return `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`;
}

function createCommentElements(picture){
  const documentFragment = document.createDocumentFragment();
  const url = 'photos' + picture.querySelector('.picture__img').src.split('photos')[1];
  const comments = pictures.find((item) => item.url === url).comments;
  return comments.map((comment) => createCommentElement(comment));
}

function openViewiengWindow (){
  imageViewiengWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function closeViewiengWindow (){
  imageViewiengWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

viewiengWindowClose.addEventListener('click', closeViewiengWindow);

document.addEventListener('keydown', (evt) =>{
  if(isEscapeKey(evt)){
    closeViewiengWindow();
  }

});

function viewPicture(picture){
  imageViewiengWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  viewiengWindowImg.src = picture.querySelector('.picture__img').src;
  likesCount.textContent = picture.querySelector('.picture__likes').textContent;
  commentsCount.textContent = picture.querySelector('.picture__comments').textContent;
  socialDescription.textContent = picture.querySelector('.picture__img').alt;
  socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  const commentsRaw = createCommentElements(picture);
  socialComments.innerHTML = '';
  commentsRaw.forEach((comment) => socialComments.insertAdjacentHTML('beforeend', comment));
}

export {imageViewiengWindow, viewPicture};
