import React, { Component, useState, useEffect } from 'react'
import './Dashboard.css';
import Graph from './Graph';



export default class Dashboard extends Component{
    chartRef = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      index: '',
      act: 0
    }

  }
  async fetchAPI() {
    fetch("https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json")
      .then(res => res.json())
      .then(res =>
          this.setState({
          data: res,
          active: (res["加拿大"]["confirmedCount"])[Object.keys(res["加拿大"]["confirmedCount"])[Object.keys(res["加拿大"]["confirmedCount"]).length - 1]],
          cured:  (res["加拿大"]["curedCount"])[Object.keys(res["加拿大"]["curedCount"])[Object.keys(res["加拿大"]["curedCount"]).length - 1]],
          dead:(res["加拿大"]["deadCount"])[Object.keys(res["加拿大"]["deadCount"])[Object.keys(res["加拿大"]["deadCount"]).length - 1]]
        }))
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.fetchAPI();
  }
  render() {
    var datas = this.state.data;
    var active = this.state.active;
    var cured = this.state.cured;
    var dead = this.state.dead;
    //console.log(datas)
    //var tactive = active[Object.keys(active)[Object.keys(active).length - 1]];
    var obj = [];
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    for (var key in datas["加拿大"]) {
        if (!datas["加拿大"].hasOwnProperty(key)) continue;
        var obj1 = datas["加拿大"][key];
        var obje = obj1.ENGLISH;
        var objc = obj1.confirmedCount;
        if(obje !== undefined && !isEmpty(objc)){
            obj.push([obje,objc[Object.keys(objc)[Object.keys(objc).length - 1]]]);
        }
        else if(isEmpty(objc) && obje !== undefined){
            obj.push([obje,0])
        }
    }
  return (

     <body id="page-top">
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 animated fadeInUp">
            <div class="container-fluid d-flex flex-column p-0">
                <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div class="sidebar-brand-icon rotate-n-15"></div>
                    <div class="sidebar-brand-text mx-3"><span>COVID19</span></div>
                </a>
                <hr class="sidebar-divider my-0 animated fadeInUp"/>
                <ul class="nav navbar-nav text-light" id="accordionSidebar">
                    <li class="nav-item" role="presentation"><a class="nav-link active" href="index.html"><i
                                class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
                    <li class="nav-item" role="presentation"></li>
                    <li class="nav-item" role="presentation"></li>
                    <li class="nav-item" role="presentation"></li>
                    <li class="nav-item" role="presentation"></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="table-1.html"><i
                                class="fas fa-table"></i><span>Table</span></a></li>
                </ul>
                <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0"
                        id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top animated fadeInUp">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle mr-3"
                            id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <h3 class="text-dark mb-0">Dashboard</h3>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="d-sm-flex justify-content-between align-items-center mb-4"></div>
                    <div class="row">
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-left-primary py-2 animated fadeInUp">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col mr-2">
                                            <div class="text-uppercase text-primary font-weight-bold text-xs mb-1">
                                                <span>TOTAL CASES(ACTIVE)</span></div>
                                            <div class="text-dark font-weight-bold h5 mb-0"><span>{active}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-left-success py-2 animated fadeInUp">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col mr-2">
                                            <div class="text-uppercase text-success font-weight-bold text-xs mb-1">
                                                <span>TOtal recovered</span></div>
                                            <div class="text-dark font-weight-bold h5 mb-0"><span>{cured}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-left-info py-2 animated fadeInUp">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col mr-2">
                                            <div class="text-uppercase text-info font-weight-bold text-xs mb-1">
                                                <span>TOtal deceased</span></div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="text-dark font-weight-bold h5 mb-0 mr-3">
                                                        <span>{dead}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg col-xl">
                            <div class="card shadow mb-4 animated fadeInUp">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h6 class="text-primary font-weight-bold m-0">Statistics</h6>
                                    <div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-expanded="false" type="button"><i
                                                class="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                                            role="menu">
                                            <p class="text-center dropdown-header">dropdown header:</p><a
                                                class="dropdown-item" role="presentation" href="#">&nbsp;Action</a><a
                                                class="dropdown-item" role="presentation" href="#">&nbsp;Another
                                                action</a>
                                            <div class="dropdown-divider"></div><a class="dropdown-item"
                                                role="presentation" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="chart-area">
                                    <Graph/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg col-xl">
                            <div class="card shadow mb-4 animated fadeInUp">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h6 class="text-primary font-weight-bold m-0">Map</h6>
                                    <div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-expanded="false" type="button"><i
                                                class="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                                            role="menu">
                                            <p class="text-center dropdown-header">dropdown header:</p><a
                                                class="dropdown-item" role="presentation" href="#">&nbsp;Action</a><a
                                                class="dropdown-item" role="presentation" href="#">&nbsp;Another
                                                action</a>
                                            <div class="dropdown-divider"></div><a class="dropdown-item"
                                                role="presentation" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="chart-area">
                                        
                                        <div id="visualization">
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="table-responsive animated fadeInUp">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Number</th>
                                            <th>Province</th>
                                            <th>Active cases</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {obj.map((event, index) => (
                                          <tr key={index + 1}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{event[0]}</td>
                                            <td>{event[1]}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="bg-white sticky-footer">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Copyright © Brand 2020</span></div>
                </div>
            </footer>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
</body>
 
  );
              }
}
