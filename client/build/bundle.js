/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CharView  = __webpack_require__(2);
const Request = __webpack_require__(1);

const charView = new CharView();
const request = new Request('http://localhost:3000/api/disney')

const app = function(){
  const createButton = document.querySelector('#submit-button');
  createButton.addEventListener('click', createButtonClicked);
  request.get(getCharsRequestComplete);
}

const getCharsRequestComplete = function(allChars){
  allChars.forEach(function(character){
    charView.addChar(character);
  });
}

const createButtonClicked = function(e){
  e.preventDefault(); // WHAT IS THIS LINE DOING??
  const nameInput = document.querySelector('#name').value;
  const typeInput = document.querySelector('#type').value;
  const filmInput = document.querySelector('#film').value;

  const item = {
    name: nameInput,
    type: typeInput,
    movie: filmInput
  };

  request.post(createRequestComplete, item);
}

const createRequestComplete =function(newChar){
  charView.addChar(newChar);
}


document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url){
  this.url = url;
}

Request.prototype.get = function (callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 200){
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  })
  request.send();
};

Request.prototype.post = function(callback, body){
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function(){
    if(this.status !== 201){
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(body));
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var CharView = function(){
  this.chars = [];
}

CharView.prototype.addChar = function(char) {
  this.chars.push(char);
  this.render(char);
}

CharView.prototype.clear = function(char) {
  this.chars = [];
  const ul = document.querySelector('#characters');
  ul.innerHTML = '';
}

CharView.prototype.render = function(char){
    const ul = document.querySelector('#characters');
    const li = document.createElement('li');
    const name = document.createElement('h3');
    const details = document.createElement('p');

    name.innerText = char.name;
    details.innerText = `A ${char.type} from ${char.movie}.`

    li.appendChild(name);
    li.appendChild(details);
    ul.appendChild(li);
}

 module.exports = CharView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map