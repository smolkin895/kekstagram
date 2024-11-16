import {renderPictures} from './picture.js';
import  './openEditor.js';
import {get_data} from "./api.js";
import {showAlert} from "./utils.js";

get_data('/kekstagram/data', renderPictures, showAlert);
