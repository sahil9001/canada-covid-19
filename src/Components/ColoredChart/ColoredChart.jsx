import Chart from 'chart.js';
import moment from 'moment';
import propTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const ColoredChart = props => {
  const chartRef = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current && props.chartData) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: Object.keys(props.chartData),
          datasets: [
            {
              data: Object.values(props.chartData),
              radius: 0,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              hoverRadius: 1
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
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
                  callback: function(value, index, values) {
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
                  callback: function(value, index, values) {
                    return index === 4 ? value : value / 1000 + 'k';
                  }
                }
              }
            ]
          }
        }
      });
      setChartInstance(newChartInstance);
    }
  }, [chartRef, props.chartData]);

  return (
    <div className="col">
      <div className="row">
        <div className={`col ${props.color ? `text-${props.color}` : 'text-dark'}`}>
          <div className="text-uppercase text-sm mb-2">{props.title}</div>
          <div className="row no-gutters">
            <div className="font-weight-bolder h2 mb-1">{props.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="col my-auto ml-2">
              <i className={`fa ${props.changeGrow ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
              {props.change}
            </div>
          </div>
        </div>
        <div className="col text-right">
          <div className="text-uppercase text-sm mb-2">{moment().format('MMM DD')}</div>
          <div className="text-dark text-uppercase font-weight-bolder mb-1">{props.province}</div>
        </div>
      </div>
      <div className="row no-gutters align-items-center">
        <div className="col">{<canvas id="overviewChart" ref={chartRef} />}</div>
      </div>
    </div>
  );
};

ColoredChart.propTypes = {
  chartData: propTypes.object.isRequired,
  title: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  change: propTypes.number.isRequired,
  changeGrow: propTypes.bool,
  province: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  color: propTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'secondary'])
};

export default ColoredChart;
