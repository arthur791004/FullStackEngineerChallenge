import React from 'react';
import { bool, string, node } from 'prop-types';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

const LoadingContainer = styled.div`
  position: relative;
  height: 100px;
`;

const List = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  } else if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return children;
};

List.propTypes = {
  isLoading: bool.isRequired,
  error: string.isRequired,
  children: node.isRequired,
};

export default List;
