import React from 'react';

export default function Table(props) {
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

  return (
    <div className="container animated fadeInUp delay-1s">
      <div className="scrollable">
        <table className="table">
          <thead className="thead-dark ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Provinces</th>
              <th scope="col">Confirmed cases</th>
              <th scope="col">Cured</th>
              <th scope="col">Dead</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
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
    </div>
  );
}
