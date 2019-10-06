import React from 'react';
import styled, { css } from 'styled-components';
import { bool, string, node } from 'prop-types';
import { BLACK, LIGHT_WHITE, GRAY } from '@/styles/colors';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

const maxWidthCSS = maxWidth => css`
  max-width: ${maxWidth}px;
`;

export const TableRow = styled.tr`
  height: 56px;
  border: 1px solid ${GRAY};
  border-top: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export const TableData = styled.td`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};

  ${({ maxWidth }) => maxWidth && maxWidthCSS(maxWidth)};
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

export const TableHead = styled.th`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};
`;

export const TableHeader = styled.thead`
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

export default Table;
