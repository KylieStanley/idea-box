$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.delete-button').on('click', removeIdea);
$('.upvote-button').on('click', upvoteIdea);
$('.downvote-button').on('click', downvoteIdea);

function createIdea(e) {
  e.preventDefault();
  $('.idea-section').prepend(`<h3>${$('.idea-title').val()}</h3>
                              <button class='delete-button'></button>
                              <p>${$('.idea-body').val()}</p>
                              <button class="upvote-button"></button>
                              <button class="downvote-button"></button>
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
  if (isDisabled) {
    $('.save-button').prop('disabled', true);
  } else {
    $('.save-button').prop('disabled', false);
  }
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