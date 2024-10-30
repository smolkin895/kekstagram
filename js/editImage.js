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
};


function addPreviewCloseListener(evt){
  closeEditor(evt);
}

function closeEditor(evt){
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // console.log(evt.target);
  evt.target.removeEventListener('click', addPreviewCloseListener);
}

function openEditor(){
  // console.log(fileReader.readAsDataURL(fileINput.files[0]));
  // uploadPreviewImg.src = fileReader.readAsDataURL();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', addPreviewCloseListener);
}

fileINput.addEventListener('change', (evt) => {
  readURL(evt.target);
  openEditor();
})
