import React, { useState, useCallback } from 'react';
import { string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { BLACK, LIGHTEN_BLACK, GRAY } from '@/styles/colors';
import cover from '@/styles/cover';

const floatingCSS = css`
  transform: scale(0.75) translate(0px, -26px);
`;

const Label = styled.label`
  position: absolute;
  top: 20px;
  line-height: 24px;
  color: ${props => (props.isFocused ? BLACK : LIGHTEN_BLACK)};
  transform-origin: left top 0px;
  transition: all 0.3s ease-out;
  pointer-events: none;
  user-select: none;
  z-index: 1;

  ${props => props.floating && floatingCSS};
`;

const Input = styled.input`
  position: relative;
  top: 20px;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  color: ${BLACK};
  box-sizing: border-box;
`;

const activeCSS = css`
  &:after {
    transform: scaleX(1);
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 1px;

  &:before {
    ${cover()};
    content: '';
    background-color: ${GRAY};
  }

  &:after {
    ${cover()};
    content: '';
    background-color: ${BLACK};
    transform: scaleX(0);
    transition: transform 0.3s ease-out;
  }

  ${props => props.active && activeCSS};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 66px;
  font-size: 16px;
  line-height: 24px;
`;

const TextField = ({ label, type, name, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  const handleBlur = useCallback(() => setIsFocused(false), [setIsFocused]);

  return (
    <Container>
      <Label floating={isFocused || !!value} isFocused={isFocused}>
        {label}
      </Label>
      <Input
        {...props}
        type={type}
        name={name}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
      <Underline active={isFocused} />
    </Container>
  );
};

TextField.propTypes = {
  label: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func,
};

TextField.defaultProps = {
  onChange: () => {},
};

export default TextField;
