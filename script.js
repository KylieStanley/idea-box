$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.idea-card-section').on('click', removeIdea);
$('.idea-card-section').on('click', upvoteIdea);
$('.idea-card-section').on('click', downvoteIdea);
$('.search-input').on('keyup', searchIdea)

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
  createHTML(newIdea);
  clearInputs();
  enableSubmit();
  storeIdea(newIdea);
}

function createHTML(newIdea) {
  $('.search-input').after(`<article class="idea-section">
                              <h3 class='edit edit-h3' contenteditable='true'>${newIdea.title}</h3>
                              <button class='delete-button btn' id='${newIdea.uniqueId}'></button>
                              <p class='edit edit-p' contenteditable='true'>${newIdea.body}</p>
                              <div>
                              <button class="upvote-button btn" id='${newIdea.uniqueId}'></button>
                              <button class="downvote-button btn" id='${newIdea.uniqueId}'></button>
                              <p class="quality">quality: ${newIdea.quality}</p>
                              </div>
                              <hr noshade>
                            </article>`);

  $('.edit').on('keypress', editIdeasOnEnter);
  $('.edit').on('focusout', editIdeasClickOut);
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

function storeIdea(newIdea) {
 var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.uniqueId, stringifiedIdea);
}

function getIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createHTML(parsedObject);
  }
} 

function searchIdea() {
  $('article').each(function(index, value) {
    var cardTitle = $(value).children('.edit-h3');
    cardTitle.html();
    var searchText = $('.search-input').val();
    cardTitle.html().indexOf(searchText);
    if (cardTitle.html().indexOf(searchText) < 0) {
      value.style.display = "none";
    } else {
      value.style.display = "";
    }
  }); 
}





function editIdeasOnEnter(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    var updateId = $(this).siblings('button').attr("id");
    var parsedObject = JSON.parse(localStorage.getItem(updateId));
    parsedObject.title = $('.edit-h3').html();
    parsedObject.body = $('.edit-p').html();
    storeIdea(parsedObject);
    document.activeElement.blur();
  }
}

function editIdeasClickOut(e) {
    var updateId = $(this).siblings('button').attr("id");
    var parsedObject = JSON.parse(localStorage.getItem(updateId));
    parsedObject.title = $('.edit-h3').html();
    parsedObject.body = $('.edit-p').html();
    storeIdea(parsedObject);
  }

function removeIdea(e) {
  if (e.target.className === 'delete-button btn') {
    $(e.target).parent().remove();
    var deleteId = e.target.id;
    localStorage.removeItem(deleteId);
  }
}

function upvoteIdea(e) {
  if (e.target.className === 'upvote-button btn') {
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
  if (e.target.className === 'downvote-button btn') {
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
