import {ACADEMY_BASE_URL} from "./data.js";

function getData(path, onSuccess, onFail){
  fetch(ACADEMY_BASE_URL.concat(path))
    .then(response => {
      if(response.ok){
        onSuccess(response.json());
      }
      else{
        onFail('При получении данных произошла ошибка, попробойте ещё раз.');
      }
    })
    .catch(() => {
      onFail('При получении данных произошла ошибка, попробойте ещё раз.');
    })
}


function sendData(path, body, onSuccess, onFail){
  fetch(ACADEMY_BASE_URL.concat(path),{
    method: 'POST',
    body: body
  })
    .then(response => {
      if(response.ok){
        onSuccess();
      }
      else{
        onFail('Упали в else');
      }
    })
    .catch((e) => {
      console.log(e);})
}


export {getData, sendData}