'use strict';

function watchForm() {
  $('form').submit(function(event) {
    console.log('Submit working') 
    event.preventDefault() ;
    let myValue = document.getElementsByName('dogBreed')[0].value;
    console.log(myValue);
    getDogImage(myValue);
    });
  }

function getDogImage(myValue) {
  fetch('https://dog.ceo/api/breed/' + myValue + '/images')
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
    })

    .then(responseJson => 
      displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text('Invalid dog breed! Try again (maybe lowercase this time)');
    });
  };
function displayResults(responseJson) {
  console.log(responseJson);
  $('.results-img').empty();
  for (let i = 0; i < responseJson.message.length; i++) {
    $('.results-img').append (
      `<img src="${responseJson.message[i]}">`
    )
  };

  //display the results section
  $('.results').removeClass('hidden');
}



$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
