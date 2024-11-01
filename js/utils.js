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
export {getNumberGenerator, getRandomArrayItem, getRandomValue, checkLength, isEscapeKey};
