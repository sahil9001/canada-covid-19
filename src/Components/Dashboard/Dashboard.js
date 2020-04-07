import React from 'react';
import './Dashboard.css';
import Graph from '../Graph/Graph';
import Table from '../Table/Table';

function Dashboard() {
  return (
    <div class="container-fluid">
      <div class="row">
      <Graph/>
      <Table/>
      </div>
    </div>
  );
}

export default Dashboard;
