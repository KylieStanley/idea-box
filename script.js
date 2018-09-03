$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.idea-card-section').on('click', removeIdea);
$('.idea-card-section').on('click', upvoteIdea);

var ideasArray = new Array();

$(document).ready(getIdea);

function Idea (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.qualityCount = 0;
  this.uniqueId = Date.now();
}

function createIdea(e) {
  e.preventDefault();
  var title = $('.idea-title').val();
  var body = $('.idea-body').val();
  var newIdea = new Idea(title, body);
  createHTML(newIdea.title, newIdea.body, newIdea.quality, newIdea.uniqueId);
  clearInputs();
  enableSubmit();
  storeIdea(newIdea);
}

function storeIdea(newIdea) {
 var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.uniqueId, stringifiedIdea);
}

function getIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    ideasArray.push(parsedObject);
    createHTML(ideasArray[i].title,ideasArray[i].body, 
      ideasArray[i].quality, ideasArray[i].uniqueId);
  }
} 

function createHTML(title, body, quality, id) {
  $('.search-input').after(`<article class="idea-section">
                              <h3>${title}</h3>
                              <button class='delete-button' id='${id}'></button>
                              <p>${body}</p>
                              <button class="upvote-button"></button>
                              <button class="downvote-button"></button>
                              <p class="quality">quality: ${quality}</p>
                              <hr>
                            </article>`);
}

function clearInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
}

function enableSubmit() {
  var isDisabled = $('.idea-title').val() === '' || $('.idea-body').val() === '';
  if (isDisabled) {
    $('.save-button').prop('disabled', true);
  } else {
    $('.save-button').prop('disabled', false);
  }
}

function removeIdea(e) {
  if (e.target.className === 'delete-button') {
    $(e.target).parent().remove();
  }
  console.log(e.target.id)
  var deleteId = e.target.id;
    localStorage.removeItem(deleteId);
}
function upvoteIdea(e) {
  if (e.target.className === 'upvote-button') {

    for (var i = 0; i < localStorage.length; i++) {

      var retrievedObject = localStorage.getItem(localStorage.key(i));
      var parsedObject = JSON.parse(retrievedObject);
      if (event.target.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML === 'quality: swill') {
        event.target.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = 'quality: plausible';
        return parsedObject.quality = "plausible";
      } else {
        event.target.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = 'quality: genius';
        return parsedObject.quality = "genius";
      }
      storeIdea(parsedObject);
    }
  }
}

// function downvoteIdea(e) {
//   if (e.target.className() === '.downvote-button') {
//     $(e.target).parent().akls;sdkf;alsfkja;lsdkfj
//   }
// }



