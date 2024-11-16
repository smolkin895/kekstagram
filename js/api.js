import {ACADEMY_BASE_URL} from "./data.js";

function get_data(path, onSuccess, onFail){
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

export {get_data}