import { css } from 'styled-components';

const configs = {
  small: {
    height: 20,
    padding: 8,
    fontSize: 12,
  },
  medium: {
    height: 32,
    padding: 21,
    fontSize: 14,
  },
  large: {
    height: 42,
    padding: 25,
    fontSize: 16,
  },
};

export const sizes = size => {
  const { height, padding, fontSize } = configs[size] || configs.medium;

  return css`
    height: ${height}px;
    line-height: ${height}px;
    border-radius: ${height / 2}px;
    padding: 0 ${padding}px;
    font-size: ${fontSize}px;
  `;
};
