import React from 'react';
import { string, number } from 'prop-types';
import isAdmin from '@/utils/isAdmin';
import Badge from '@/components/Badge';
import { TableRow, TableData } from '@/components/Table';
import UpdateEmployButton from './UpdateEmployeeButton';

const Employee = ({ id, email, role }) => (
  <TableRow>
    <TableData>
      <span>{email}</span>
      {isAdmin({ role }) && <Badge size="small">admin</Badge>}
    </TableData>
    <TableData align="right">
      <UpdateEmployButton id={id} email={email} role={role} />
    </TableData>
  </TableRow>
);

Employee.propTypes = {
  id: string.isRequired,
  email: string.isRequired,
  role: number.isRequired,
};

export default Employee;
