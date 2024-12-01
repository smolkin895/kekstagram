import {ALERT_SHOW_TIME} from "./data.js";

const getRandomValue = (a, b) =>{
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkLength = (str, maxLength) => str.length >= maxLength;

const getRandomArrayItem = (array) => array[getRandomValue(0,array.length-1)];

function *getNumberGenerator(max) {
  let index = 1;
  while (index < max) {
    yield index++;
  }
}

const getRandomUniqueValue = () => {
  const previousValues = [];
  return function (min, max){
    let currentValue = getRandomValue(min, max);
    if(previousValues.length >= (max - min) + 1){
      console.error(`Уникальные ID в диапазоне ${min} - ${max} исчерпаны`);
      return null;
    }
    while(previousValues.includes(currentValue)){
      currentValue = getRandomValue(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const addEventListeners = function (elements, event, handler){
  for(const elem of elements){
    elem.addEventListener(event, handler);
  }
}

const removeEventListeners = function (elements, event, handler){
  for(const elem of elements){
    elem.removeEventListener(event, handler);
  }
}

function isEscapeKey(evt){
  return evt.key === 'Escape';
}


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


function deBounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId = null;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    window.clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = window.setTimeout(() => callback.apply(this, rest), timeoutDelay);
    console.log(timeoutId);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getNumberGenerator, getRandomArrayItem, getRandomValue, checkLength, isEscapeKey, showAlert, deBounce};
