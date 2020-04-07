import React, { Component } from 'react'
import Chart from "chart.js";


export default class Graph extends Component {
    constructor(props) {
        super(props)
        this.state ={
        }
    }
    chartRef = React.createRef();
    async fetchAPI() {
        await fetch("https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json")
          .then(res => res.json())
          .then(res =>
              this.setState({
              data: res,
              activec: res["加拿大"]["confirmedCount"],
              active: (res["加拿大"]["confirmedCount"])[Object.keys(res["加拿大"]["confirmedCount"])[Object.keys(res["加拿大"]["confirmedCount"]).length - 1]],
              cured:  (res["加拿大"]["curedCount"])[Object.keys(res["加拿大"]["curedCount"])[Object.keys(res["加拿大"]["curedCount"]).length - 1]],
              dead:(res["加拿大"]["deadCount"])[Object.keys(res["加拿大"]["deadCount"])[Object.keys(res["加拿大"]["deadCount"]).length - 1]],
              labels: res["加拿大"]["confirmedCount"]
            }))
          .catch(err => console.log(err))
      }
     async fetchChart(){
         await this.fetchAPI();
         var labels = [];
         var datac = []
         var activec = this.state.activec;
         console.log(activec)
         for(var key in activec){
             labels.push(key)
             datac.push(activec[key])
         }
         console.log(labels)
         const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Active cases",
                        data: datac,
                    }
                ]
            },
            options: {
               responsive:true
            }
        });
     }
    componentDidMount() {
    
        this.fetchChart();
    }
    render() {
        console.log(this.chartRef)
        return (
            
                <canvas
                    id="myChart"
                   
                    ref={this.chartRef}
                />
        )
    }
}