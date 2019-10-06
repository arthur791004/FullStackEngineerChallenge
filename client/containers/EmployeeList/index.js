import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserList,
  selectIsLoading,
  selectError,
  getUserListThunk,
} from '@/redux/slices/users';
import Table, {
  TableHeader,
  TableHead,
  TableRow,
  TableContent,
} from '@/components/Table';
import Employee from './Employee';

const Container = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;

const EmployeeList = () => {
  const userList = useSelector(selectUserList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListThunk());
  }, [dispatch]);

  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead align="left">Email</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <tbody>
          <TableContent isLoading={isLoading} error={error}>
            {userList.map(({ id, email, role }) => (
              <Employee key={id} email={email} role={role} />
            ))}
          </TableContent>
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
