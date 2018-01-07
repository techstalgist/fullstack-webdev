import React from 'react';

const Statistic = (props) => {
  const {name, value} = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

export default Statistic