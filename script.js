$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.delete-button').on('click', deleteIdea);
$('.upvote-button').on('click', upvoteIdea);
$('.downvote-button').on('click', downvoteIdea);

function createIdea(e) {
  e.preventDefault();
  $('.idea-section').prepend(`<h3>${$('.idea-title').val()}</h3>
                              <img src="" class='delete-button' >
                              <p>${$('.idea-body').val()}</p>
                              <img src="" class="upvote-button" >
                              <img src="" class="downvote-button" >
                              <p>quality: swill</p>
                              <hr>`);
  clearInputs();
  enableSubmit();
}

function clearInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
}

function enableSubmit() {
  var isDisabled = $('.idea-title').val() === '' || $('.idea-body').val() === '';
}

function removeIdea(e) {
  if (e.target.tagName.toLowerCase() === '.delete-button') {
    $(e.target).parent().remove();
  }
}

function upvoteIdea(e) {
  if (e.target.tagName.toLowerCase() === '.upvote-button') {
    $(e.target).parent().akl;sdfja;lskdjfal;skdfjadls;
  }
}

function downvoteIdea(e) {
  if (e.target.tagName.toLowerCase() === '.downvote-button') {
    $(e.target).parent().akls;sdkf;alsfkja;lsdkfj
  }
}