import {isEscapeKey} from "./utils.js";
import {hashtagInput, commentInput, scaleControlListener, scaleControlValue } from "./editImage.js";

const fileINput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreviewImg = document.querySelector('img');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

const fR=new FileReader();

function readURL(el) {
  if (el.files && el.files[0]) {
       fR.addEventListener('load', function(e) {
          uploadPreviewImg.src=e.target.result
       });
       fR.readAsDataURL(el.files[0]);
  }
}

function escCloseHandler(evt) {
  if(isEscapeKey(evt) && evt.target != hashtagInput && evt.target != commentInput){
    closeEditor(evt);
  }
}

function addPreviewCloseListener(evt){
  closeEditor(evt);
}

function unhideEditor(){
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function hideEditor(){
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function closeEditor(evt){
  hideEditor();
  fileINput.value = '';
  evt.target.removeEventListener('click', addPreviewCloseListener);
  document.removeEventListener('keydown', escCloseHandler);
  uploadForm.removeEventListener('click', scaleControlListener);

}

function openEditor(){
  unhideEditor();
  uploadCancel.addEventListener('click', addPreviewCloseListener);
  document.addEventListener('keydown', escCloseHandler);
  scaleControlValue.value = '100%';
  uploadPreviewImage.style['transform'] = 1.00;
  uploadForm.addEventListener('click', scaleControlListener);
}

fileINput.addEventListener('change', (evt) => {
  readURL(evt.target);
  openEditor();
})

export { uploadForm, uploadPreviewImage };
