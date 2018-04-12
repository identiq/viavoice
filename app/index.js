import $ from "jquery";
import noUiSlider from "nouislider";
import 'bootstrap';
import 'fullpage.js';
import 'select2';
import 'styles/index.scss';
import { csvJSON, getCSV, getMultipleCSV, getQuestionsData } from 'utils.js';


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

  // Charts
  getCSV('/assets/datasets/barcadres2017v70_cmp.csv').then((_d) => {
    let data = csvJSON(_d);
    console.log(data);
    let qdata = getQuestionsData(data.lines);
    console.log(qdata);
    // Do things
  });
});
