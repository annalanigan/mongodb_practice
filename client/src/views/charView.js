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
