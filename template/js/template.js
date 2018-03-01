/* global Materialize */
$(document).ready(() => {
  $('.button-collapse').sideNav();
  // for nav menu on small screens
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
    min: [true],
    closeOnSelect: false // Close upon selecting a date,
  });
  $('.dropdown-button').dropdown({ hover: true });
  $('.modal').modal();
  $('#add_centers').click(() => {
    const center = $('#center_list_input').val();
    const old = new Set($('#added_centers').val().split(','));
    if (center) {
      old.add(center);
      $('#added_centers').val(`${Array.from(old).filter(word => word.length > 3)}`);
      $('#center_list_input').val('');
      // reinitialize all the Materialize labels on the form if you are dynamically adding inputs
      Materialize.updateTextFields();
    }
  });
});