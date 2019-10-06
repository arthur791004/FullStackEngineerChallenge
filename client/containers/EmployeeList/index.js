import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserList,
  selectIsLoading,
  selectError,
  getUserListThunk,
} from '@/redux/slices/users';
import { BLACK, LIGHT_WHITE } from '@/styles/colors';
import { TableRow, TableContent } from './Table';
import Employee from './Employee';

const Th = styled.th`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};
`;

const Thead = styled.thead`
  color: ${LIGHT_WHITE};
  background-color: ${BLACK};
`;

const Table = styled.table`
  position: relative;
  min-width: 768px;
  min-height: 300px;
  border-spacing: 0;
  border-collapse: collapse;
`;

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
        <Thead>
          <TableRow>
            <Th align="left">Email</Th>
            <Th />
          </TableRow>
        </Thead>
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
