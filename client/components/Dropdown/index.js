import React from 'react';
import { arrayOf, string, shape, number, oneOf, func } from 'prop-types';

const Dropdown = ({ list, message, handleSelect }) => (
  <select onChange={handleSelect}>
    <option>{message}</option>
    {list.map(({ name, value }) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
  </select>
);

Dropdown.propTypes = {
  list: arrayOf(
    shape({
      name: string.isRequired,
      value: oneOf([number, string]).isRequried,
    }).isRequired
  ).isRequired,
  message: string.isRequired,
  handleSelect: func.isRequired,
};

export default Dropdown;
