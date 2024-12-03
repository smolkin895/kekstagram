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
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif']; 


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
  commentInput.value = '';
  hashtagInput.value = '';
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
  document.querySelector('#upload-submit').disabled = false;

  uploadCancel.addEventListener('click', addPreviewCloseListener);
  document.addEventListener('keydown', escCloseHandler);
  scaleControlValue.value = '100%';
  uploadPreviewImage.style.transform = 'scale(1)';
  originalEffect.checked = true;
  uploadForm.addEventListener('click', scaleControlListener);
  uploadForm.addEventListener('click', applyEffectlListener);
  commentInput.value = '';
  hashtagInput.value = '';
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
      document.querySelector('#upload-submit').disabled = true;
      const data = new FormData(evt.target);
      sendData('/kekstagram',
        data,
        () => {
        closeEditor();
        const sucessWindowNode =  document.getElementById('success').content.cloneNode(true);
        document.body.appendChild(sucessWindowNode);
        const successButton = document.querySelector('.success__button');
        const successWindow = document.querySelector('.success__inner');
        const mouseupListener = (evt) => {
          if(successWindow && evt.target != successWindow && evt.target.parentNode != successWindow){
            document.querySelector('.success').remove();
          }
        };
        window.addEventListener('mouseup', mouseupListener);
        successButton.addEventListener('click', () => {
          document.querySelector('.success').remove();
        })
        },
        () => {
          closeEditor();
          const errorWindowNode =  document.getElementById('error').content.cloneNode(true);
          document.body.appendChild(errorWindowNode);
          const errorButton = document.querySelector('.error__button');
          const errorWindow = document.querySelector('.error__inner');
          const mouseupErrorListener = (evt) => {
            if(errorWindow && evt.target == errorButton){
              console.log('Кликаем при неудаче');
              document.querySelector('.error').remove();
              console.log(fileINput);
              fileINput.click();
            }
          };
          window.addEventListener('mouseup', mouseupErrorListener);
        })
    }
    else{
      pristine.validate({silent:true});
    }
  });
}

const isValidFile = (file) => {
  return FILE_TYPES.some((i) => file.name.endsWith(i));
}

fileINput.addEventListener('change', (evt) => {
  const file = fileINput.files[0];
  if(file && isValidFile(file)){
    uploadPreviewImage.src = URL.createObjectURL(file);
  };
  openEditor();
})


export { uploadForm, uploadPreviewImage, effectLevelValue, setUserFormSubmit };


