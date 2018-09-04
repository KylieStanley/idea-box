$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.idea-card-section').on('click', removeIdea);
$('.idea-card-section').on('click', upvoteIdea);
$('.idea-card-section').on('click', downvoteIdea);

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
    createHTML(parsedObject.title, parsedObject.body, parsedObject.quality, parsedObject.uniqueId);
  }
} 

function createHTML(title, body, quality, id) {
  $('.search-input').after(`<article class="idea-section">
                              <h3>${title}</h3>
                              <button class='delete-button' id='${id}'></button>
                              <p>${body}</p>
                              <button class="upvote-button" id='${id}'></button>
                              <button class="downvote-button" id='${id}'></button>
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
    var deleteId = e.target.id;
    localStorage.removeItem(deleteId);
  }
}

function upvoteIdea(e) {
  if (e.target.className === 'upvote-button') {
    var qualityText = e.target.nextSibling.nextSibling.nextSibling.nextSibling;
    var upvoteId = e.target.id;
    var parsedObject = JSON.parse(localStorage.getItem(upvoteId));   
    if (qualityText.innerHTML === 'quality: swill') {
      qualityText.innerHTML = 'quality: plausible';
      parsedObject.quality = "plausible";
    } else {
      qualityText.innerHTML = 'quality: genius';
      parsedObject.quality = "genius";
    }
    storeIdea(parsedObject);
  }
}

function downvoteIdea(e) {
  if (e.target.className === 'downvote-button') {
    var qualityText = e.target.nextSibling.nextSibling;
    var downvoteId = e.target.id;
    var parsedObject = JSON.parse(localStorage.getItem(downvoteId));   
    if (qualityText.innerHTML === 'quality: genius') {
      qualityText.innerHTML = 'quality: plausible';
      parsedObject.quality = "plausible";
    } else {
      qualityText.innerHTML = 'quality: swill';
      parsedObject.quality = "swill";
    }
    storeIdea(parsedObject);
  }
}
