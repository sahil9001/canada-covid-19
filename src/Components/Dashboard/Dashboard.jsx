import React, { Component } from 'react';
import ChartCard from '../ChartCard/ChartCard';
import Footer from '../Footer/Footer';
import OverviewCard from '../OverviewCard/OverviewCard';
import Table from '../Table/Table';
import Graph from './Graph';
import moment from 'moment';

export default class Dashboard extends Component {
  chartRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      total: 0,
      recovered: 0,
      dead: 0
    };
  }

  async fetchAPI() {
    fetch('https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json')
      .then(res => res.json())
      .then(res => res['加拿大'])
      .then(res =>
        this.setState({
          data: res,
          total: res.confirmedCount[Object.keys(res.confirmedCount)[Object.keys(res.confirmedCount).length - 1]],
          recovered: res.curedCount[Object.keys(res.curedCount)[Object.keys(res.curedCount).length - 2]],
          dead: res.deadCount[Object.keys(res.deadCount)[Object.keys(res.deadCount).length - 1]]
        })
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchAPI();
  }

  getActiveCasesChartData = () => {
    const { confirmedCount, curedCount, deadCount } = this.state.data;
    let chartData = {};
    if (confirmedCount) {
      for (const key in confirmedCount) {
        chartData = {
          ...chartData,
          [key]: (confirmedCount[key] | 0) - (curedCount[key] | 0) - (deadCount[key] | 0)
        };
      }
      chartData = {
        ...chartData,
        [moment()
          .format('YYYY-MM-DD')
          .toString()]: this.state.total - this.state.recovered - this.state.dead
      };
    }
    return chartData;
  };

  render = () => (
    <div id="page-top">
      <div id="wrapper">
        <nav className="navbar navbar-dark align-items-start accordion bg-gradient-primary p-0 animated fadeInUp"></nav>
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top animated fadeInUp">
              <div className="container-fluid">
                <h3 className="text-dark mb-0">COVID-19 CANADA</h3>
              </div>
            </nav>
            <div className="container">
              <div className="column">
                <div className="container-fluid">
                  <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>
                  <div className="row">
                    <div className="col-md-6 col-xl-3 mb-4">
                      <OverviewCard title="Total cases" value={this.state.total} chartData={this.state.data.confirmedCount} />
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <OverviewCard
                        title="Active"
                        value={this.state.total - this.state.recovered - this.state.dead}
                        chartData={this.getActiveCasesChartData()}
                      />
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <OverviewCard
                        title="Recovered"
                        value={this.state.recovered}
                        chartData={{
                          ...this.state.data.curedCount,
                          [moment()
                            .format('YYYY-MM-DD')
                            .toString()]: this.state.recovered
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <OverviewCard title="Deaths" value={this.state.dead} chartData={this.state.data.deadCount} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg col-xl">
                      <ChartCard name="Statistics">
                        <Graph />
                      </ChartCard>
                    </div>
                    <div className="col-lg col-xl">
                      <ChartCard name="Map">
                        <div id="visualization" />
                      </ChartCard>
                    </div>
                  </div>
                  <Table data={this.state.data} />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <a className="border rounded d-inline scroll-to-top" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </div>
  );
}
