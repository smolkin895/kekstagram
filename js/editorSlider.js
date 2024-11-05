import {sliderELement} from './editImage.js';

let slider;

const sliderConfigs = {
  'effect-chrome': {
    start: 40,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  },
  'effect-sepia': {
    start: 40,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  },
  'effect-marvin': {
    start: 40,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  },
  'effect-phobos': {
    start: 40,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  },
  'effect-heat': {
    start: 40,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  }
}

function createSlider(element) {
  const configItem = element.closest('.effects__label').getAttribute('for');
  const classList = Array.from(element.classList.values());
  if (classList.every(i => i.indexOf('none') == -1)){
      if (slider) {
        slider.destroy();
      }
      slider = noUiSlider.create(sliderELement, sliderConfigs[configItem]);
      return slider;
    }
  slider.destroy();
  return;
}

export {createSlider};