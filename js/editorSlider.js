import {sliderELement} from './editImage.js';
import {effectLevelValue, uploadPreviewImage} from './openEditor.js';

let slider;

const sliderConfigs = {
  'effect-chrome': {
    styleTemplate: 'grayscale(val)',
    config: {
      start: 0.5,
      step: 0.1,
      connect: 'lower',
      range: {
        'min': 0,
        'max': 1
      },
      format: {
        to: function (value) {
          return parseFloat(value).toFixed(1);
        },
        from: function (value) {
          return parseFloat(value).toFixed(1);
        },
      }
    }
  },
  'effect-sepia': {
    styleTemplate: 'sepia(val)',
    config: {
      start: 0.5,
      connect: 'lower',
      range: {
        'min': 0,
        'max': 1
      },
      format: {
        to: function (value) {
          return parseFloat(value).toFixed(1);
        },
        from: function (value) {
          return parseFloat(value).toFixed(1);
        },
      }
    }
    },
    'effect-marvin': {
      styleTemplate: 'invert(val%)',
      config: {
        start: 80,
        connect: 'lower',
        range: {
          'min': 0,
          'max': 100
        },
        format: {
          to: function (value) {
            return parseInt(value);
          },
          from: function (value) {
            return parseInt(value);
          },
        }
      }
    },
  'effect-phobos': {
    styleTemplate: 'blur(valpx)',
    config: {
      start: 1,
      connect: 'lower',
      range: {
        'min': 0,
        'max': 3
      },
      format: {
        to: function (value) {
          return parseInt(value);
        },
        from: function (value) {
          return parseInt(value);
        },
      }
    }
  },
  'effect-heat': {
    styleTemplate: 'brightness(val)',
    config: {
      start: 2,
      connect: 'lower',
      range: {
        'min': 1,
        'max': 3
      },
      format: {
        to: function (value) {
          return parseFloat(value).toFixed(1);
        },
        from: function (value) {
          return parseFloat(value).toFixed(1);
        },
      }
    }
  }
}

function createSlider(element) {
  const configItem = element.closest('.effects__label').getAttribute('for');
  const classList = Array.from(element.classList.values());
  if (classList.every(i => i.indexOf('none') == -1)){
      if (slider) {
        console.log('Рушим слайдер и сделаем новый');
        slider.destroy();
      }
      slider = noUiSlider.create(sliderELement, sliderConfigs[configItem]['config']);
      console.log(typeof (slider));
      slider.on('update', function(){
      effectLevelValue.value = slider.get();
        console.log( effectLevelValue.value );
        uploadPreviewImage.style.filter = sliderConfigs[configItem].styleTemplate.replace('val', slider.get())
    });
      console.log('Создали новый слайдер');
      return slider;
    }
  console.log('Просто рушим слайдер и выходим');
  uploadPreviewImage.style.filter = '';
  slider.destroy();
  return;
}

export {createSlider};
