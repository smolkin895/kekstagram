import {isEscapeKey} from "./utils.js";

const fileINput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview');
const uploadPreviewImg = document.querySelector('img');
const uploadCancel = document.querySelector('#upload-cancel');
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
  if(isEscapeKey(evt)){
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
}

function openEditor(){
  unhideEditor();
  uploadCancel.addEventListener('click', addPreviewCloseListener);
  document.addEventListener('keydown', escCloseHandler);
}

fileINput.addEventListener('change', (evt) => {
  readURL(evt.target);
  openEditor();
})
