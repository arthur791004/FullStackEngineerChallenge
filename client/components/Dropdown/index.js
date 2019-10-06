import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

const DEFAULT_MESSAGE = '--- select an employee ---';

const Dropdown = ({ list, handleSelect }) => (
  <select onChange={handleSelect}>
    <option>{DEFAULT_MESSAGE}</option>
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
      value: string.isRequired,
    })
  ).isRequired,
  selected: string.isRequired,
  handleSelect: func.isRequired,
};

export default Dropdown;
