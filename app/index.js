import $ from "jquery";
import noUiSlider from "nouislider";
import 'bootstrap';
import 'fullpage.js';
import 'select2';
import 'Chart.js';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-annotation';
import 'styles/index.scss';

$(function () {

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


  Chart.defaults.scale.gridLines.display = false;
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.layout.padding.top = 30;
  Chart.defaults.global.defaultFontFamily = "'Avenir Next', sans-serif";
  Chart.defaults.global.defaultFontColor = "#000";

  let allCtx = document.getElementById('allChart').getContext('2d');

  let gradientStroke = allCtx.createLinearGradient(150, 0, 150, 300);
  gradientStroke.addColorStop(.7, "#948A54");
  gradientStroke.addColorStop(1, "rgba(0, 0, 0, .3)");

  let allChart = new Chart(allCtx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        borderColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointBackgroundColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        data: [0, 10, 5, 2, 20, 30, 45],
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
            borderColor: "rgba(0, 0, 0, .3)",
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

  let periodCtx = document.getElementById('periodChart').getContext('2d');

  let periodChart = new Chart(periodCtx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        borderColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointBackgroundColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        data: [0, 10, 5, 2, 20, 30, 45],
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
            borderColor: "rgba(0, 0, 0, .3)",
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

  let  barCtx = document.getElementById('barChart').getContext('2d');

  let barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: barLabels,
      datasets: [{
        data: [1, 10, 5, 2, 20, 30],
        backgroundColor: barColors,
        datalabels: {
          align: 'top',
          anchor: 'end',
          color: barColors
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
              autoSkip: false
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
            borderColor: "rgba(0, 0, 0, .3)",
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

  let evolCtx = document.getElementById('evolChart').getContext('2d');

  let evolChart = new Chart(evolCtx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: `Sous-total « S'améliorera » (en %)`,
          data: [45, 30, 20, 2, 5, 10, 1],
          fill: false,
          borderColor: '#948A54',
          datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#948A54'
          }
        },
        {
          label: `Sous-total « Se dégradera » (en %)`,
          data: [1, 10, 5, 2, 20, 30, 45],
          fill: false,
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
    options: {
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
    }
  });

});
