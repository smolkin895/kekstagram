import {pictures} from './data.js';
import {isEscapeKey} from './utils.js';

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

function openViewiengWindow(){
  imageViewiengWindow.classList.remove('hidden');
  socialCommentsCount.classList.remove('hidden');
  socialCommentsLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeViewiengWindow (){
  imageViewiengWindow.classList.add('hidden');
  socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  socialCommentsLoader.removeEventListener('click', openComments);
  viewiengWindowClose.addEventListener('click', closeViewiengWindow);
  document.body.classList.remove('modal-open');
}

document.addEventListener('keydown', (evt) =>{
  if(isEscapeKey(evt)){
    closeViewiengWindow();
  }
});

function hideComments(){
  const comments = imageViewiengWindow.querySelectorAll('.social__comment');
  for(let i = 5; i < comments.length; i++){
    comments[i].classList.add('hidden');
  }
}

function openComments(){
  const hiddenComments = imageViewiengWindow.querySelectorAll('.social__comment.hidden');
  if (hiddenComments.length){
  for(let i = 0; i < Math.min(5, hiddenComments.length); i++){
    hiddenComments[i].classList.remove('hidden');
    }
    refreshSocialCommentsCount();
  }
  else{
    console.log('Все комментарии прогружены');
  }
}

function refreshSocialCommentsCount(commentsElements){
  const  comments = imageViewiengWindow.querySelectorAll('.social__comment');
  const  hiddenComments = imageViewiengWindow.querySelectorAll('.social__comment.hidden');
  const  openedComments = comments.length - hiddenComments.length;
  socialCommentsCount.childNodes[0].textContent = `${openedComments} из `;
  socialCommentsCount.childNodes[1].textContent = comments.length;
}

function viewPicture(picture){
  openViewiengWindow();
  viewiengWindowImg.src = picture.querySelector('.picture__img').src;
  likesCount.textContent = picture.querySelector('.picture__likes').textContent;
  commentsCount.textContent = picture.querySelector('.picture__comments').textContent;
  socialDescription.textContent = picture.querySelector('.picture__img').alt;
  const commentsRaw = createCommentElements(picture);
  socialComments.innerHTML = '';
  commentsRaw.forEach((comment) => socialComments.insertAdjacentHTML('beforeend', comment));
  commentsRaw.length > 5 ? hideComments() : null;
  refreshSocialCommentsCount();
  socialCommentsLoader.addEventListener('click', openComments);
  viewiengWindowClose.addEventListener('click', closeViewiengWindow);
}

export {viewPicture};
