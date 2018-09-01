$('.save-button').on('click', createIdea);
$('.idea-title').on('keyup', enableSubmit);
$('.idea-body').on('keyup', enableSubmit);
$('.idea-card-section').on('click', removeIdea);

function createIdea(e) {
  var title = $('.idea-title').val();
  var body = $('.idea-body').val();
  var newIdea = new Idea(title, body);

  e.preventDefault();
  $('.search-input').after(`<article class="idea-section">
                              <h3>${newIdea.title}</h3>
                              <button class='delete-button'></button>
                              <p>${newIdea.body}</p>
                              <button class="upvote-button"></button>
                              <button class="downvote-button"></button>
                              <p class="quality">quality: swill</p>
                              <hr>
                              </article>`);
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
  if (e.target.className === 'delete-button') {
    $(e.target).parent().remove();
  }
}

// function upvoteIdea(e) {
//   if (e.target.className === '.upvote-button') {
//     $(e.target).parent().akl;sdfja;lskdjfal;skdfjadls;
//   }
// }

// function downvoteIdea(e) {
//   if (e.target.className() === '.downvote-button') {
//     $(e.target).parent().akls;sdkf;alsfkja;lsdkfj
//   }
// }

function Idea (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.qualityCount = 0;
  this.uniqueId = Date.now();
};

// function newIdea = new Idea {}

