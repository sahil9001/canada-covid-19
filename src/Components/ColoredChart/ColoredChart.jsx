import Chart from 'chart.js';
import moment from 'moment';
import propTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const ColoredChart = props => {
  const chartRef = useRef(null);

  const chartColors = (opacity) => ({
    primary: `rgb(2, 117, 216, ${opacity})`,
    success: `rgb(92, 184, 92, ${opacity})`,
    info: `rgb(91, 192, 222, ${opacity})`,
    warning: `rgb(240, 173, 78, ${opacity})`,
    danger: `rgb(217, 83, 79, ${opacity})`,
    secondary: `rgb(134, 142, 150, ${opacity})`
  });

  useEffect(() => {
    if (chartRef && chartRef.current && props.chartData) {
      const gradientFill = chartRef.current.getContext('2d').createLinearGradient(0, 0, 0, 180);
      gradientFill.addColorStop(0, chartColors(0.2)[props.color] || chartColors(0.2)['secondary']);
      gradientFill.addColorStop(1, chartColors(0)[props.color] || chartColors(0)['secondary']);

      new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: Object.keys(props.chartData),
          datasets: [
            {
              data: Object.values(props.chartData),
              backgroundColor: gradientFill,
              borderColor: chartColors(1)[props.color] || chartColors(1)['secondary'],
              borderWidth: 2,
              hoverRadius: 1,
              lineTension: 0,
              spanGaps: true
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: -5,
              right: -5,
              top: 0,
              bottom: 0
            }
          },
          elements: {
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5,
                  maxRotation: 0,
                  callback: function(value) {
                    return moment(value).format('MMM DD');
                  }
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5,
                  callback: function(value, index) {
                    return index === 4 ? value : value / 1000 + 'k';
                  }
                }
              }
            ]
          }
        }
      });
    }
  }, [chartRef, props.chartData, props.color]);

  return (
    <div className="col">
      <div className="row">
        <div className={`col ${props.color ? `text-${props.color}` : 'text-dark'}`}>
          <div className="text-uppercase text-sm mb-2">{props.title}</div>
          <div className="row no-gutters">
            <div className="font-weight-bolder h2 mb-1">{props.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="col my-auto ml-2">
              <i className={`fa ${props.change > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
              {props.change}
            </div>
          </div>
        </div>
        <div className="col text-right">
          <div className="text-uppercase text-sm mb-2">{moment().format('MMM DD')}</div>
          <div className="text-dark text-uppercase font-weight-bolder mb-1">{props.title}</div>
        </div>
      </div>
      <div className="row no-gutters align-items-center">
        <div className="col">
          <canvas id="coloredChart" ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

ColoredChart.propTypes = {
  chartData: propTypes.object,
  title: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  change: propTypes.number.isRequired,
  province: propTypes.string.isRequired,
  color: propTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'secondary'])
};

export default ColoredChart;
