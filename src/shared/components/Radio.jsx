import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { colors } from "../../theme";

const RadioWrapper = styled.div`
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
  align-items: center;

  span:after {
    top: 5px;
    left: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
  }
`;

const StyledRadio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked ~ span {
    background-color: ${colors.colorBlue};
  }

  :checked ~ span:after {
    display: block;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: ${colors.softText};
  border-radius: 50%;

  :after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const Radio = ({ selected, onChange, text, value, ...rest }) => {
  return (
    <RadioWrapper
      {...rest}
      onClick={() => {
        onChange(value);
      }}
    >
      {text}
      <StyledRadio
        type="radio"
        readOnly
        checked={selected === value}
        aria-checked={selected === value}
        aria-label={`${text} movie type`}
      ></StyledRadio>
      <Checkmark></Checkmark>
    </RadioWrapper>
  );
};

Radio.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
};

export { Radio };
