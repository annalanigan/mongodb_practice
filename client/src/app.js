const CharView  = require('./views/charView');
const Request = require('./services/request.js');

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
