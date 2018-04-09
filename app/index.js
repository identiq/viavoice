import $ from "jquery";
import noUiSlider from "nouislider";
import 'bootstrap';
import 'fullpage.js';
import 'select2';
import 'styles/index.scss';


$(function() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage'],
    sectionsColor: ['#fff', '#fff', '#fff'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First', 'Second', 'Third']
  });

  $('select').each(function () {
    $(this).select2({
      theme: 'bootstrap4',
      placeholder: $(this).attr('placeholder'),
      allowClear: Boolean($(this).data('allow_clear')),
      width: '100%'
    });
  });

  let slider = document.getElementById('range');

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    orientation: 'vertical',
    range: {
      'min': 0,
      'max': 100
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    }
  });
});
