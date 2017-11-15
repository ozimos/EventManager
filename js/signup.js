$(document).ready(function () {
  $(".button-collapse").sideNav();
  $('.carousel').carousel();
  //reinitialize all the Materialize labels on the form if you are dynamically adding inputs
  Materialize.updateTextFields();
})