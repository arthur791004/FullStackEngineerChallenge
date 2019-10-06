import React from 'react';
import { bool, string, node } from 'prop-types';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

const List = ({ isLoading, error, children }) => {
  if (isLoading) {
    return <Loading />;
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
