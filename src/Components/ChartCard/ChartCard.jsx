import React from 'react';

const ChartCard = props => (
  <div className="card shadow mb-4 animated fadeInUp">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h6 className="text-primary font-weight-bold m-0">Statistics</h6>
      <div className="dropdown no-arrow">
        <button className="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
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
      <div className="chart-area">{props.children}</div>
    </div>
  </div>
);

export default ChartCard;
