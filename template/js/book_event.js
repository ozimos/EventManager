$(document).ready(function () {
  $(".button-collapse").sideNav(); //for nav menu on small screens
  // for carousel elements
  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  $('select').material_select(); // for select tags
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  //reinitialize all the Materialize labels on the form if you are dynamically adding inputs
  Materialize.updateTextFields();
})