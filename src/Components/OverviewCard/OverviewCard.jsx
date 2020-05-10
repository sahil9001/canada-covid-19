import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';

const OverviewCard = props => {
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
              fill: false,
              radius: 0,
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
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
          layout: {
            padding: {
              left: -10,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
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
    <div className="card shadow p-2 animated fadeInUp">
      <div className="card-body col">
        <div className="text-uppercase font-weight-bold text-xs mb-2">{props.title}</div>
        <div className="text-dark font-weight-bolder h2 mb-1">{props.value}</div>
        <div className="row no-gutters align-items-center">
          <div className="col-auto">{<canvas id="overviewChart" ref={chartRef} />}</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
