$(document).ready(function () {
  $(".button-collapse").sideNav();
  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  //reinitialize all the Materialize labels on the form if you are dynamically adding inputs
  Materialize.updateTextFields();
})