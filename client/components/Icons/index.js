import { number, string } from 'prop-types';
import styled from 'styled-components';

const ICON_SIZE = 24;

export const Icon = styled.div`
  display: inline-flex;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  svg {
    width: ${props => props.size}px;
    height: ${props => props.size}px;

    ${({ color }) => color && `fill: ${color};`}
  }
`;

Icon.propTypes = {
  size: number,
  color: string,
};

Icon.defaultProps = {
  size: ICON_SIZE,
  color: 'black',
};
