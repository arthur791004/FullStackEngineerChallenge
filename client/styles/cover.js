import { css } from 'styled-components';

const cover = (offset = 0) => css`
  position: absolute;
  left: ${offset}px;
  right: ${offset}px;
  top: ${offset}px;
  bottom: ${offset}px;
`;

export default cover;
