import React, { Component } from 'react';

import Graph from './Graph';
import Table from '../Table/Table';

export default class Dashboard extends Component {
  chartRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      active: 0,
      cured: 0,
      dead: 0
    };
  }
  
  async fetchAPI() {
    fetch('https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json')
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res,
          active:
            res['加拿大']['confirmedCount'][
              Object.keys(res['加拿大']['confirmedCount'])[Object.keys(res['加拿大']['confirmedCount']).length - 1]
            ],
          cured: res['加拿大']['curedCount'][Object.keys(res['加拿大']['curedCount'])[Object.keys(res['加拿大']['curedCount']).length - 1]],
          dead: res['加拿大']['deadCount'][Object.keys(res['加拿大']['deadCount'])[Object.keys(res['加拿大']['deadCount']).length - 1]]
        })
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchAPI();
  }

  render() {
    return (
      <div id="page-top">
        <div id="wrapper">
          <nav className="navbar navbar-dark align-items-start accordion bg-gradient-primary p-0 animated fadeInUp"></nav>
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top animated fadeInUp">
                <div className="container-fluid">
                  <h3 className="text-dark mb-0">COVID19 Canada</h3>
                </div>
              </nav>
              <div className="container">
                <div className="column">
                  <div className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>
                    <div className="row">
                      <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-left-primary py-2 animated fadeInUp">
                          <div className="card-body">
                            <div className="row align-items-center no-gutters">
                              <div className="col mr-2">
                                <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                                  <span>TOTAL CASES(ACTIVE)</span>
                                </div>
                                <div className="text-dark font-weight-bold h5 mb-0">
                                  <span>{this.state.active}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-left-success py-2 animated fadeInUp">
                          <div className="card-body">
                            <div className="row align-items-center no-gutters">
                              <div className="col mr-2">
                                <div className="text-uppercase text-success font-weight-bold text-xs mb-1">
                                  <span>TOtal recovered</span>
                                </div>
                                <div className="text-dark font-weight-bold h5 mb-0">
                                  <span>{this.state.cured}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-left-info py-2 animated fadeInUp">
                          <div className="card-body">
                            <div className="row align-items-center no-gutters">
                              <div className="col mr-2">
                                <div className="text-uppercase text-info font-weight-bold text-xs mb-1">
                                  <span>TOtal deceased</span>
                                </div>
                                <div className="row no-gutters align-items-center">
                                  <div className="col-auto">
                                    <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                      <span>{this.state.dead}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg col-xl">
                        <div className="card shadow mb-4 animated fadeInUp">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="text-primary font-weight-bold m-0">Statistics</h6>
                            <div className="dropdown no-arrow">
                              <button
                                className="btn btn-link btn-sm dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                type="button"
                              >
                                <i className="fas fa-ellipsis-v text-gray-400"></i>
                              </button>
                              <div className="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                                <p className="text-center dropdown-header">dropdown header:</p>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Action
                                </a>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Another action
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="chart-area">
                              <Graph />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg col-xl">
                        <div className="card shadow mb-4 animated fadeInUp">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="text-primary font-weight-bold m-0">Map</h6>
                            <div className="dropdown no-arrow">
                              <button
                                className="btn btn-link btn-sm dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                type="button"
                              >
                                <i className="fas fa-ellipsis-v text-gray-400"></i>
                              </button>
                              <div className="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                                <p className="text-center dropdown-header">dropdown header:</p>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Action
                                </a>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Another action
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" role="presentation" href="/#">
                                  &nbsp;Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="chart-area">
                              <div id="visualization"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Table data={this.state.data} />
                  </div>
                </div>
                <footer className="bg-white sticky-footer">
                  <div className="container my-auto">
                    <div className="text-center my-auto copyright">
                      <span>Copyright © Brand 2020</span>
                    </div>
                  </div>
                </footer>
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
}
