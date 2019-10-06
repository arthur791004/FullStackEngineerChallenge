import React from 'react';
import styled from 'styled-components';
import { bool, string, node } from 'prop-types';
import { GRAY } from '@/styles/colors';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export const TableRow = styled.tr`
  height: 56px;
  line-height: 56px;
  border: 1px solid ${GRAY};
  border-top: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export const TableData = styled.td`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};
`;

const Error = styled(ErrorMessage)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TableContent = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <TableRow>
        <Loading as="td" />
        <TableData />
      </TableRow>
    );
  } else if (error) {
    return (
      <TableRow>
        <td>
          <Error>{error}</Error>
        </td>
        <TableData />
      </TableRow>
    );
  }

  return children;
};

TableContent.propTypes = {
  isLoading: bool.isRequired,
  error: string.isRequired,
  children: node.isRequired,
};
