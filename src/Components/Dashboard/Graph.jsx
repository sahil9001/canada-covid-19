import React, { Component } from 'react';
import Chart from 'chart.js';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  chartRef = React.createRef();
  async fetchAPI() {
    await fetch('https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json')
      .then(res => res.json())
      .then(res =>
        this.setState({
          confirmedCases: res['加拿大']['confirmedCount']
        })
      )
      .catch(err => console.log(err));
  }
  async fetchChart() {
    await this.fetchAPI();
    var labels = [];
    var datac = [];
    var activec = this.state.confirmedCases;
    for (var key in activec) {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var d = key.split('-');
      var monthName = parseInt(d[1]);
      labels.push(months[monthName - 1] + ' ' + d[2]);
      datac.push(activec[key]);
    }
    
    const myChartRef = this.chartRef.current.getContext('2d');
    new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            fill: true,
            backgroundColor: 'rgba(65, 131, 215, 0.5)',
            label: 'Active cases',
            data: datac
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
                autoSkip: true,
                maxTicksLimit: 10
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: true,
                autoSkip: true,
                maxTicksLimit: 6
              }
            }
          ]
        }
      }
    });
  }
  componentDidMount() {
    this.fetchChart();
  }
  render() {
    return <canvas id="myChart" ref={this.chartRef} />;
  }
}
