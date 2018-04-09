import $ from "jquery";
import noUiSlider from "nouislider";
import 'bootstrap';
import 'fullpage.js';
import 'styles/index.scss';


$(function() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage'],
    sectionsColor: ['#FAFAFA', '#fff', '#FAFAFA'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First', 'Second', 'Third']
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
