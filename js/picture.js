import {viewPicture} from './fullsizeView.js';
import {deBounce} from './utils.js';
import {getData} from "./api.js";
import {picturesStorage} from "./data.js";
import {showAlert} from "./utils.js";


const picturesContainer = document.querySelector('.pictures.container');
const filtersForm = document.querySelector('.img-filters__form');
const filtersFormButton = document.querySelectorAll('.img-filters__button');
const pictureTemplate = picture.content;
const documentFragment = document.createDocumentFragment();
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const PICTURES_RANDOM = 10;


function createPicture({url, description, comments, likes}){
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  return picture;
}

const randomSort = () => Math.random() - 0.5;
const moreDiscussedSort = (picA, picB) => {
  return picB.comments.length - picA.comments.length;
}

const filterPictures = (elemId) =>{
  return (pictures) => {
  switch(elemId) {
    case Filter.DEFAULT:
      return pictures;
    case Filter.RANDOM:
      console.log('Зашел в рандом');
      return pictures.sort(randomSort).slice(0, PICTURES_RANDOM);
    case Filter.DISCUSSED:
      console.log('Зашел в обсуждаемые');
      pictures = pictures.sort(moreDiscussedSort);
      console.log(pictures);
      return pictures.sort(moreDiscussedSort);
    }
  }
}

filtersForm.addEventListener('click', (evt) => {
  const elem = evt.target;
  if (elem.classList.contains('img-filters__button')){
    filtersFormButton.forEach((elem) => {
      elem.classList.remove('img-filters__button--active');
    });
    elem.classList.add('img-filters__button--active');
    // Запрашиваем данные с сервера, сортируем, фильтруем и отрисовываем
    deBounce(() => {
      getData('/kekstagram/data',
        (pictures) => {
          const picturesToBeDeleted = picturesContainer.querySelectorAll('.picture');
          picturesToBeDeleted.forEach((picture) => picture.remove());
          renderPictures(pictures, filterPictures(elem.id));
        },
        showAlert);
    })()
  }
})


function viewPictureListener(evt){
  if(evt.target.matches('.picture__img')){
    viewPicture(evt.target.closest('.picture'));
  }
}

function renderPictures(pictures, filterPictures=null){
  pictures
    .then((data) => {
      console.log(Array.isArray(data));
      if (filterPictures){
        data = filterPictures(data);
      }
      picturesStorage = [...data];
      data.forEach((picture) => {
        documentFragment.append(createPicture(picture));
      });
      picturesContainer.appendChild(documentFragment);
      picturesContainer.addEventListener('click', viewPictureListener);
    });
}

function unhideFilters(){
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
}

export {renderPictures, unhideFilters};
