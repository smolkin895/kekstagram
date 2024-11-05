import {sliderELement} from './editImage.js';

let slider;

const sliderConfigs = {
  'effect-chrome': {
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  },
  'effect-sepia': {
    range: {
      'min': 1300,
      'max': 3250
    },
    step: 150,
    start: [1450, 2050, 2350, 3000],
    margin: 300,
    limit: 600,
    connect: true,
    direction: 'rtl',
    orientation: 'vertical',
    behaviour: 'tap-drag',
    tooltips: true,
  },
  'effect-marvin': {
    range: {
      'min': 1300,
      'max': 3250
    },
    step: 150,
    start: [1450, 2050, 2350, 3000],
    margin: 300,
    limit: 600,
    connect: true,
    direction: 'rtl',
    orientation: 'vertical',
    behaviour: 'tap-drag',
    tooltips: true,
  },
  'effect-phobos': {
    range: {
      'min': 1300,
      'max': 3250
    },
    step: 150,
    start: [1450, 2050, 2350, 3000],
    margin: 300,
    limit: 600,
    connect: true,
    direction: 'rtl',
    orientation: 'vertical',
    behaviour: 'tap-drag',
    tooltips: true,
  },
  'effect-heat': {
    range: {
      'min': 1300,
      'max': 3250
    },
    step: 150,
    start: [1450, 2050, 2350, 3000],
    margin: 300,
    limit: 600,
    connect: true,
    direction: 'rtl',
    orientation: 'vertical',
    behaviour: 'tap-drag',
    tooltips: true,
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