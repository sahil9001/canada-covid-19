import React, { useState, useMemo } from 'react';

export default function Table(props) {
  const [sortConfig, setSortConfig] = useState(null);
  const tableData = props.data;
  const canadaKey = '加拿大';
  const tableRows = [];

  function isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  for (const key in tableData[canadaKey]) {
    if (!tableData[canadaKey].hasOwnProperty(key)) continue;

    const item = tableData[canadaKey][key];
    const province = item.ENGLISH;
    const confirmed = item.confirmedCount;
    const cured = item.curedCount;
    const dead = item.deadCount;

    if (province) {
      if (isEmpty(confirmed)) {
        tableRows.push({ province, confirmed: 0, cured: 0, dead: 0 });
      } else {
        const confirmDates = Object.keys(confirmed);
        const curedDates = Object.keys(cured);
        const deadDates = Object.keys(dead);
        tableRows.push({
          province,
          confirmed: confirmed[confirmDates[confirmDates.length - 1]],
          cured: cured[curedDates[curedDates.length - 1]] || 0,
          dead: dead[deadDates[deadDates.length - 1]] || 0
        });
      }
    }
  }

  const sortedRows = useMemo(() => {
    let sortedItems = [...tableRows];
    if (sortConfig !== null) {
      sortedItems = sortedItems.sort((first, second) => {
        if (first[sortConfig.field] < second[sortConfig.field]) {
          return sortConfig.ascending ? -1 : 1;
        }
        if (first[sortConfig.field] > second[sortConfig.field]) {
          return sortConfig.ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedItems;
  }, [tableRows, sortConfig]);

  const requestSort = field => {
    let ascending = true;
    if (sortConfig && sortConfig.field === field && sortConfig.ascending) {
      ascending = false;
    }
    setSortConfig({ field, ascending });
  };

  const getClassNamesFor = (field) => {
    if (!sortConfig || sortConfig.field !== field) {
      return 'fa-sort';
    }
    return sortConfig.ascending ? 'fa-sort-up' : 'fa-sort-down';
  };

  return (
    <div className="animated fadeInUp delay-1s">
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <div className="d-flex align-items-center justify-content-between">
                Provinces
                <button className="btn" type="button" onClick={() => requestSort('province')}>
                  <i className={`fas ${getClassNamesFor('province')}`}></i>
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="d-flex align-items-center justify-content-between">
                Confirmed cases
                <button className="btn" type="button" onClick={() => requestSort('confirmed')}>
                <i className={`fas ${getClassNamesFor('confirmed')}`}></i>
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="d-flex align-items-center justify-content-between">
                Cured
                <button className="btn" type="button" onClick={() => requestSort('cured')}>
                <i className={`fas ${getClassNamesFor('cured')}`}></i>
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="d-flex align-items-center justify-content-between">
                Dead
                <button className="btn" type="button" onClick={() => requestSort('dead')}>
                <i className={`fas ${getClassNamesFor('dead')}`}></i>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={row.province}>
              <th scope="row">{index + 1}</th>
              <td>{row.province}</td>
              <td>{row.confirmed}</td>
              <td>{row.cured}</td>
              <td>{row.dead}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
