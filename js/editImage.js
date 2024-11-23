import {uploadPreviewImage} from './openEditor.js';
import {createSlider} from './editorSlider.js';

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const scaleControlValue = document.querySelector('.scale__control--value');
const sliderFieldsetELement = document.querySelector('.img-upload__effect-level');
const sliderELement = document.querySelector('.effect-level__slider');


function scalePicture(value){
  scaleControlValue.value = value + '%';
  uploadPreviewImage.style['transform'] = `scale(${(value/100).toFixed(2)})`
}

function scaleControlListener(evt){
  const elem = evt.target;
  if(!elem.matches('.scale__control--smaller') && !elem.matches('.scale__control--bigger')){
    return
  }
  const step = 25;
  let currentValue = parseInt(scaleControlValue.value.split('%'));
  if(elem.matches('.scale__control--smaller')){
    currentValue === 25 ? null : scalePicture(currentValue - step);
  }
  else{
    currentValue === 100 ? null : scalePicture(currentValue + step);
  }
}

function applyEffectlListener(evt){
  const elem = evt.target;
  if(!elem.matches('.effects__preview')){
    return
  }
  uploadPreviewImage.classList.value = '';
  uploadPreviewImage.classList.add(elem.classList[1]);
  createSlider(elem) ? sliderFieldsetELement.classList.remove('hidden') : sliderFieldsetELement.classList.add('hidden');
}

export {hashtagInput, commentInput, scaleControlListener, scaleControlValue, applyEffectlListener, sliderELement, sliderFieldsetELement};