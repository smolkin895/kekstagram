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
      console.log('Cycle');
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};
// var messageTemplate = document.getElementById('message-template');
// var chatContainer = document.querySelector('.chat-content');
// var form = document.querySelector('.chat-form');
// var formInput = form.querySelector('input');


// function addRemoveListener(elem){
//   elem.addEventListener('click', ()=> {
//     console.log(elem);
//   });
// }
// form.addEventListener('submit', (evt)=> {
//   evt.preventDefault();
//   var clonedTemplate = messageTemplate.cloneNode(true).content;
//   var removeButton = clonedTemplate.querySelector('.chat-message-button');
//   addRemoveListener(removeButton);
//   var inputText = formInput.value;
//   var clonedDescription = clonedTemplate.querySelector('.chat-message-text');
//   clonedDescription.textContent = inputText;
//   chatContainer.appendChild(clonedTemplate);
// });

function isEnterKey(evt){
  return evt.key === 'Enter';
}

function isEscapeKey(evt){
  return evt.key === 'Escape';
}
export {getNumberGenerator, getRandomArrayItem, getRandomValue, checkLength, isEnterKey, isEscapeKey};
