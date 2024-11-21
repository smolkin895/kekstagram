import {isEscapeKey} from "./utils.js";
import {
  hashtagInput,
  commentInput,
  scaleControlListener,
  scaleControlValue,
  applyEffectlListener,
  sliderFieldsetELement
} from "./editImage.js";
import {sendData} from "./api.js";

const fileINput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreviewImg = document.querySelector('img');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');


const originalEffect = document.querySelector('#effect-none');


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
  sliderFieldsetELement.classList.add('hidden');
}

function hideEditor(){
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function closeEditor(evt){
  hideEditor();
  uploadPreviewImage.style.filter = '';
  fileINput.value = '';
  uploadCancel.removeEventListener('click', addPreviewCloseListener);
  document.removeEventListener('keydown', escCloseHandler);
  uploadForm.removeEventListener('click', scaleControlListener);
  uploadPreviewImage.classList.value = '';
}

function openEditor(){
  unhideEditor();
  uploadCancel.addEventListener('click', addPreviewCloseListener);
  document.addEventListener('keydown', escCloseHandler);
  scaleControlValue.value = '100%';
  uploadPreviewImage.style['transform'] = 1.00;
  originalEffect.checked = true;
  uploadForm.addEventListener('click', scaleControlListener);
  uploadForm.addEventListener('click', applyEffectlListener);
  commentInput.textContent = '';
  hashtagInput.textContent = '';
}

const setUserFormSubmit = () =>{
  const pristine = new Pristine(uploadForm,     {
      classTo: 'form-group',
      errorClass: 'has-danger',
      successClass: 'has-success',
      errorTextParent: 'form-group'},
    true);
  uploadForm.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    console.log(pristine.validate())
    if (pristine.validate()){
      const data = new FormData(evt.target);
      sendData('/kekstagram',
        data,
        () => {
        closeEditor();
        const sucessWindow =  document.getElementById('success').content.cloneNode(true);
        console.log(sucessWindow);
        document.body.appendChild(sucessWindow);
        const successButton = document.querySelector('.success__button');
        successButton.addEventListener('click', () => {
          document.querySelector('.success').remove();
        })
        },
        alert
        )
    }
    else{
      pristine.validate({silent:true});
    }
  });
}

fileINput.addEventListener('change', (evt) => {
  readURL(evt.target);
  openEditor();
})

export { uploadForm, uploadPreviewImage, effectLevelValue, setUserFormSubmit };

