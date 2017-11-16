$(document).ready(function () {
  $(".button-collapse").sideNav();
  $('select').material_select();
  //reinitialize all the Materialize labels on the form if you are dynamically adding inputs
  Materialize.updateTextFields();
})