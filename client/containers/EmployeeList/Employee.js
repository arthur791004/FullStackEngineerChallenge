import React from 'react';
import { string, number } from 'prop-types';
import isAdmin from '@/utils/isAdmin';
import TextButton from '@/components/Button/TextButton';
import Badge from '@/components/Badge';
import { TableRow, TableData } from '@/components/Table';

const Employee = ({ email, role }) => (
  <TableRow>
    <TableData>
      <span>{email}</span>
      {isAdmin({ role }) && <Badge size="small">admin</Badge>}
    </TableData>
    <TableData align="right">
      <TextButton>Edit</TextButton>
    </TableData>
  </TableRow>
);

Employee.propTypes = {
  email: string.isRequired,
  role: number.isRequired,
};

export default Employee;
