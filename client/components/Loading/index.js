import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as LoadingIcon } from '@/assets/svg/loading.svg';
import cover from '@/styles/cover';
import { Icon } from '@/components/Icons';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Icon).attrs(({ size = 45 }) => ({
  children: <LoadingIcon />,
  size,
}))`
  ${cover()};
  margin: auto;
  animation: ${rotate} 0.9s linear infinite;
  will-change: transform;
`;

export default Loading;
