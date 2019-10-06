import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { DANGER } from '@/styles/colors';
import { sizes } from '@/components/Button/utils';

const Badge = styled.div`
  ${props => sizes(props.size)};
  display: inline-block;
  margin: 0 8px;
  color: white;
  background-color: ${DANGER};
`;

Badge.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
};

Badge.defaultProps = {
  size: 'medium',
};

export default Badge;
