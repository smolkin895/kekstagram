import {renderPictures, unhideFilters} from './picture.js';
import  './openEditor.js';
import {getData} from "./api.js";
import {showAlert} from "./utils.js";
import {setUserFormSubmit} from "./openEditor.js";


getData('/kekstagram/data',
    renderPictures,
    showAlert);
unhideFilters();
setUserFormSubmit();
