import {sliderELement} from './editImage.js';

const sliderConfigs = {
  'effect-chrome': {
  range: {
    'min': 0,
    'max': 1
  },
  step: 0.1,
  start: 1,
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
  effectMarvin: {
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

function createSlider(element){
  const configItem = element.closest('.effects__label').getAttribute('for');
  const classList = Array.from(element.classList.values());
  if(classList.some(i => !i.indexOf('none')));
  console.log(noUiSlider.target)
    return noUiSlider.create(sliderELement, sliderConfigs[configItem]);
  return null;
}

export {createSlider};