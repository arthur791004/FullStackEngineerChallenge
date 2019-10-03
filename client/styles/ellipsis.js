import { css } from 'styled-components';

const ellipsis = (width = '100%') => css`
  width: ${width};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ellipsis;
