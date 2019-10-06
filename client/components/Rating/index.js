import React from 'react';
import { number, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ReactComponent as StarBorderIcon } from '@/assets/svg/star_border.svg';
import { ReactComponent as StarIcon } from '@/assets/svg/star.svg';
import { Icon } from '@/components/Icons';

const MAX_RATING = 5;

const inactiveCSS = css`
  svg {
    &:last-child {
      fill: none;
    }
  }
`;

const activeCSS = css`
  svg {
    &:last-child {
      fill: #ffcb00;
    }
  }
`;

const Star = styled(Icon).attrs(({ size }) => ({
  children: (
    <>
      <StarBorderIcon />
      <StarIcon />
    </>
  ),
  size,
}))`
  position: relative;
  svg {
    position: absolute;
    fill: #ffcb00;
  }

  ${inactiveCSS};
  ${props => props.isActive && activeCSS};
`;

const editableCSS = css`
  &:hover {
    ${activeCSS};
  }

  ${Star} {
    cursor: pointer;
  }

  ${Star}:hover ~ ${Star} {
    ${inactiveCSS};
  }
`;

const Container = styled.div`
  ${props => props.isEditable && editableCSS};
`;

const Rating = ({ rating, size, handleChange }) => (
  <Container isEditable={!!handleChange}>
    {Array.from({ length: MAX_RATING }, (_, i) => (
      <Star
        key={i}
        size={size}
        isActive={i < rating}
        onClick={() => handleChange(i + 1)}
      />
    ))}
  </Container>
);

Rating.propTypes = {
  rating: number.isRequired,
  size: number,
  handleChange: func,
};

Rating.defaultProps = {
  size: 24,
  handleChange: null,
};

export default Rating;
