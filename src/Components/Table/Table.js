import React, { Component, useState, useEffect } from 'react';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: '',
      act: 0
    };
  }
  async fetchAPI() {
    fetch('https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json')
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      )
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.fetchAPI();
  }
  render() {
    var datas = this.state.data;
    var obj = [];
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    for (var key in datas['加拿大']) {
      if (!datas['加拿大'].hasOwnProperty(key)) continue;
      var obj1 = datas['加拿大'][key];
      var obje = obj1.ENGLISH;
      var objc = obj1.confirmedCount;
      if (obje !== undefined && !isEmpty(objc)) {
        obj.push([obje, objc[Object.keys(objc)[Object.keys(objc).length - 1]]]);
      } else if (isEmpty(objc) && obje !== undefined) {
        obj.push([obje, 0]);
      }
    }
    return (
      <div class="container animated fadeInUp delay-1s">
        <div class="scrollable">
          <table class="table">
            <thead class="thead-dark ">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Provinces</th>
                <th scope="col">Active</th>
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
    );
  }
}
