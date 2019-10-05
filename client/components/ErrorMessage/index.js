import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import { DANGER } from '@/styles/colors';

const Container = styled.div`
  height: 30px;
  color: ${DANGER};
`;

const ErrorMessage = ({ children }) => <Container>{children}</Container>;

ErrorMessage.propTypes = {
  children: node.isRequired,
};

export default ErrorMessage;
