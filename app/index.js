import 'styles/index.scss';
import 'images/viavoice.svg';
import $ from "jquery";
import noUiSlider from "nouislider";
import 'bootstrap';
import _ from 'lodash';
import 'fullpage.js';
import 'select2';
import 'chart.js';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-annotation';
import moment from 'moment';

const API_URL = "https://viavoice-api.identiq.net";
const lists = {
  "ages": [{"id": 1, "text": "18-29 ans"}, {"id": 2, "text": "30-39 ans"}, {
    "id": 3,
    "text": "40-49 ans"
  }, {"id": 4, "text": "50 ans et plus"}],
  "sexes": [{"id": 1, "text": "Homme"}, {"id": 2, "text": "Femme"}],
  "secteurs": [{"id": 1, "text": "Secteur public"}, {"id": 2, "text": "Secteur privé"}]
};


$(function () {


  $('#fullpage').fullpage({
    anchors: ['indicesyn', 'indicean', 'question1', 'question2', 'question3', 'question4', 'question5'],
    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
    navigation: true,
    navigationPosition: 'right'
  });


  let ageInput = $('select[name="age[]"]');
  ageInput.select2({
    theme: 'bootstrap4',
    allowClear: Boolean(ageInput.data('allow_clear')),
    width: '100%',
    data: lists.ages,
    placeholder: ageInput.attr('placeholder')
  });

  let secteurInput = $('select[name="secteur[]"]');
  secteurInput.select2({
    theme: 'bootstrap4',
    placeholder: secteurInput.attr('placeholder'),
    allowClear: Boolean(secteurInput.data('allow_clear')),
    width: '100%',
    data: lists.secteurs
  });

  let sexeInput = $('select[name="sexe[]"]');
  sexeInput.select2({
    theme: 'bootstrap4',
    placeholder: sexeInput.attr('placeholder'),
    allowClear: Boolean(sexeInput.data('allow_clear')),
    width: '100%',
    data: lists.sexes
  });

  let slider = document.getElementById('range');

  noUiSlider.create(slider, {
    start: [moment('2013-01-01').valueOf(), moment('2017-12-01').valueOf()],
    connect: true,
    orientation: 'vertical',
    range: {
      'min': moment('2011-01-01').valueOf(),
      'max': moment().valueOf()
    },
    step: 95 * 24 * 60 * 60 * 1000,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return value;
      }
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4,
      filter: function () {
        return 2;
      },
      format: {
        to: function (value) {

          if (['1', '12'].indexOf(moment(value).format('M')) > -1) {
            return moment(value).format('MMMM YYYY')
          }

          return moment(value).format('MMMM');
        },
        from: function (value) {
          return value;
        }
      }
    }
  });

  const barColors = [
    'rgba(148, 138, 84, 1)',
    'rgba(148, 138, 84, 0.75)',
    'rgba(148, 138, 84, 0.5)',
    'rgba(0, 0, 0, 0.3)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.05)'
  ];

  const barLabels = [
    `S’améliorera  nettement`,
    `S’améliorera  un peu`,
    `Restera  stationnaire`,
    `Se dégradera  un peu`,
    `Se dégradera  nettement`,
    `Non réponse`
  ];

  const bar2Labels = [
    `Augmentera  nettement`,
    `Augmentera  un peu`,
    `Restera  stationnaire`,
    `Diminuera un peu`,
    `Diminuera nettement`,
    `Non réponse`
  ];

  const bar3Labels = [
    `Va s’améliorer nettement`,
    `Va s’améliorer  un peu`,
    `Restera  stationnaire`,
    `Va se dégrader  un peu`,
    `Va se dégrader nettement`,
    `Non réponse`
  ];

  const bar4Labels = [
    `Très motivés`,
    `Assez motivés`,
    `Pas vraiment motivés`,
    `Pas du tout motivés`,
    `Ne se prononce pas`
  ];

  const bar5Labels = [
    `Très importantes`,
    `Plutôt importantes`,
    `Plutôt faibles`,
    `Inexistantes`,
    `Ne se prononce pas`
  ];

  const barOptions = {
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'rgba(0, 0, 0, .5)',
            autoSkip: false
          }
        }
      ]
    }
  };

  const evolOptions = {
    legend: {
      display: true,
      labels: {
        boxWidth: 10,
        fontSize: 10,
        fontColor: '#4A4A4A'

      }
    },
    title: {
      fontColor: '#4A4A4A',
      fontStyle: 400,
      fontSize: 14,
      display: true,
      text: 'Évolution sur l’année'
    },
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'rgba(0, 0, 0, .5)',
            autoSkip: false,
            maxRotation: 80,
            minRotation: 45
          }
        }
      ]
    }
  };

  Chart.defaults.scale.gridLines.display = false;
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.layout.padding.top = 30;
  Chart.defaults.global.defaultFontFamily = "'Avenir Next', sans-serif";
  Chart.defaults.global.defaultFontColor = "#000";

  let allCtx = document.getElementById('allChart').getContext('2d');

  let gradientStroke = allCtx.createLinearGradient(150, 0, 150, 300);
  gradientStroke.addColorStop(.7, "#948A54");
  gradientStroke.addColorStop(1, "rgba(0, 0, 0, .3)");

  $.ajax({
    url : `${API_URL}/indice`,
    type : 'GET',
    complete: function(results, status) {
      let allChart = new Chart(allCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON, 'name'),
          datasets: [{
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            data: _.map(results.responseJSON, row => _.round(row.indice * 100)),
            fill: false,
            datalabels: {
              align: 45,
              anchor: 'end'
            }
          }]
        },
        // Configuration options go here
        options: {
          scales: {
            yAxes: [
              {
                display: false,
                gridLines: {
                  drawBorder: false
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'rgba(0, 0, 0, .5)',
                  autoSkip: false,
                  maxRotation: 80,
                  minRotation: 45
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                drawTime: "afterDatasetsDraw",
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: "February",
                borderColor: "rgba(0, 0, 0, .05)",
                borderWidth: 1,
                label: {
                  fontFamily: "'Avenir Next', sans-serif",
                  fontStyle: "400",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  yAdjust: -200,
                  yPadding: 30,
                  fontColor: "#000",
                  content: "Présidentielle 2017",
                  enabled: true
                },
              }
            ]
          }
        }
      });
    }
  });



  let periodCtx = document.getElementById('periodChart').getContext('2d');

  $.ajax({
    url: `${API_URL}/indice`,
    type: 'GET',
    complete: function (results, status) {


      let periodChart = new Chart(periodCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON, 'name'),
          datasets: [{
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            data: _.map(results.responseJSON, row => _.round(row.indice * 100)),
            fill: false,
            datalabels: {
              align: 45,
              anchor: 'end'
            }
          }]
        },
        // Configuration options go here
        options: {
          scales: {
            yAxes: [
              {
                display: false,
                gridLines: {
                  drawBorder: false
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'rgba(0, 0, 0, .5)',
                  autoSkip: false,
                  maxRotation: 80,
                  minRotation: 45
                }
              }
            ]
          }
        }
      });
    }
  });


  /***
   * Question 1
   */

  let barCtx = document.getElementById('barChart').getContext('2d');
  let evolCtx = document.getElementById('evolChart').getContext('2d');

  $.ajax({
    url : `${API_URL}/question/v1/1`,
    type : 'GET',
    complete: function(results, status) {

      $('.q1-p').text(_.round(_.last(results.responseJSON.evol).qpos * 100));
      $('.q1-n').text(_.round(_.last(results.responseJSON.evol).qneg * 100));


      let barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: barLabels,
          datasets: [{
            data: _.map(results.responseJSON.bar, row => row.total),
            backgroundColor: barColors,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: barColors
            }
          }]
        },
        // Configuration options go here
        options: barOptions
      });

      let evolChart = new Chart(evolCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON.evol, row => row.name),
          datasets: [
            {
              label: `Sous-total « S'améliorera » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qpos * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#948A54',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#948A54'
              }
            },
            {
              label: `Sous-total « Se dégradera » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qneg * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#9B9B9B',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#9B9B9B'
              }
            }
          ]
        },
        // Configuration options go here
        options: evolOptions
      });

    }
  });







  /***
   * Question 2
   */

  let barCtx2 = document.getElementById('barChart2').getContext('2d');
  let evolCtx2 = document.getElementById('evolChart2').getContext('2d');

  $.ajax({
    url : `${API_URL}/question/v1/2`,
    type : 'GET',
    complete: function(results, status) {

      $('.q2-p').text(_.round(_.last(results.responseJSON.evol).qpos * 100));
      $('.q2-n').text(_.round(_.last(results.responseJSON.evol).qneg * 100));

      let barChart2 = new Chart(barCtx2, {
        type: 'bar',
        data: {
          labels: bar2Labels,
          datasets: [{
            data: _.map(results.responseJSON.bar, row => row.total),
            backgroundColor: barColors,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: barColors
            }
          }]
        },
        // Configuration options go here
        options: barOptions
      });

      let evolChart2 = new Chart(evolCtx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON.evol, row => row.name),
          datasets: [
            {
              label: `Sous-total « Augmentera » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qpos * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#948A54',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#948A54'
              }
            },
            {
              label: `Sous-total « Diminuera » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qneg * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#9B9B9B',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#9B9B9B'
              }
            }
          ]
        },
        // Configuration options go here
        options: evolOptions
      });

    }
  });



  /***
   * Question 3
   */

  let barCtx3 = document.getElementById('barChart3').getContext('2d');
  let evolCtx3 = document.getElementById('evolChart3').getContext('2d');

  $.ajax({
    url : `${API_URL}/question/v1/3`,
    type : 'GET',
    complete: function(results, status) {

      $('.q3-p').text(_.round(_.last(results.responseJSON.evol).qpos * 100));
      $('.q3-n').text(_.round(_.last(results.responseJSON.evol).qneg * 100));

      let barChart3 = new Chart(barCtx3, {
        type: 'bar',
        data: {
          labels: bar3Labels,
          datasets: [{
            data: _.map(results.responseJSON.bar, row => row.total),
            backgroundColor: barColors,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: barColors
            }
          }]
        },
        // Configuration options go here
        options: barOptions
      });

      let evolChart3 = new Chart(evolCtx3, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON.evol, row => row.name),
          datasets: [
            {
              label: `Sous-total « Va s’améliorer » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qpos * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#948A54',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#948A54'
              }
            },
            {
              label: `Sous-total « Va se dégrader » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qneg * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#9B9B9B',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#9B9B9B'
              }
            }
          ]
        },
        // Configuration options go here
        options: evolOptions
      });

    }
  });





  /***
   * Question 4
   */

  let barCtx4 = document.getElementById('barChart4').getContext('2d');
  let evolCtx4 = document.getElementById('evolChart4').getContext('2d');

  $.ajax({
    url : `${API_URL}/question/v2/4`,
    type : 'GET',
    complete: function(results, status) {

      $('.q4-p').text(_.round(_.last(results.responseJSON.evol).qpos * 100));
      $('.q4-n').text(_.round(_.last(results.responseJSON.evol).qneg * 100));

      let barChart4 = new Chart(barCtx4, {
        type: 'bar',
        data: {
          labels: bar4Labels,
          datasets: [{
            data: _.map(results.responseJSON.bar, row => row.total),
            backgroundColor: barColors,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: barColors
            }
          }]
        },
        // Configuration options go here
        options: barOptions
      });

      let evolChart4 = new Chart(evolCtx4, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON.evol, row => row.name),
          datasets: [
            {
              label: `Sous-total « Motivés » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qpos * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#948A54',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#948A54'
              }
            },
            {
              label: `Sous-total « Pas motivés » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qneg * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#9B9B9B',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#9B9B9B'
              }
            }
          ]
        },
        // Configuration options go here
        options: evolOptions
      });

    }
  });



  /***
   * Question 5
   */

  let barCtx5 = document.getElementById('barChart5').getContext('2d');
  let evolCtx5 = document.getElementById('evolChart5').getContext('2d');

  $.ajax({
    url : `${API_URL}/question/v2/5`,
    type : 'GET',
    complete: function(results, status) {


      $('.q5-p').text(_.round(_.last(results.responseJSON.evol).qpos * 100));
      $('.q5-n').text(_.round(_.last(results.responseJSON.evol).qneg * 100));

      let barChart5 = new Chart(barCtx5, {
        type: 'bar',
        data: {
          labels: bar5Labels,
          datasets: [{
            data: _.map(results.responseJSON.bar, row => row.total),
            backgroundColor: barColors,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: barColors
            }
          }]
        },
        // Configuration options go here
        options: barOptions
      });

      let evolChart5 = new Chart(evolCtx5, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: _.map(results.responseJSON.evol, row => row.name),
          datasets: [
            {
              label: `Sous-total « Importantes » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qpos * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#948A54',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#948A54'
              }
            },
            {
              label: `Sous-total « Faibles » (en %)`,
              data: _.map(results.responseJSON.evol, row => _.round(row.qneg * 100)),
              fill: false,
              lineTension: 0,
              borderColor: '#9B9B9B',
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#9B9B9B'
              }
            }
          ]
        },
        // Configuration options go here
        options: evolOptions
      });

    }
  });




});

