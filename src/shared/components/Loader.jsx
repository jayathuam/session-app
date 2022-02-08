import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { colors } from "../../theme";

const StyledLoader = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ width }) =>
    width ? `width: 100%; max-width: ${width}px;` : "width: 100%;"}
  ${({ height }) => (height ? `height: ${height}px;` : "height: 15px;")}
  ${({ padding }) => (padding ? `padding: ${padding}px;` : "padding: 0px;")}
  margin-bottom: ${({ small }) => (small ? "8px" : "20px")}; ;
`;

const StyledSpinner = styled.span`
  display: block;
  clear: both;
  color: official;
  width: 80px;
  height: 15px;
  ${({ text }) => text && "margin-bottom: 30px;"}
  span {
    transform-origin: ${({ small }) => (small ? "37px 10px" : "37px 17px")};
    animation: spinner 1.2s linear infinite;
    display: flex;
  }
  span:after {
    content: "";
    display: block;
    width: ${({ small }) => (small ? "1px" : "2px")};
    height: ${({ small }) => (small ? "4px" : "5px")};
    background: ${colors.softText};
    position: absolute;
    top: 0;
    left: 37px;
    border-radius: 20%;
  }
  span:nth-of-type(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  span:nth-of-type(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  span:nth-of-type(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  span:nth-of-type(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  span:nth-of-type(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  span:nth-of-type(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  span:nth-of-type(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  span:nth-of-type(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  span:nth-of-type(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  span:nth-of-type(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  span:nth-of-type(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  span:nth-of-type(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StyledSpan = styled.span`
  display: block;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 1.33px;
  text-align: center;
  color: ${colors.softText};
`;

const Loader = ({ isLoading, width, height, text, padding, small, ...props }) =>
  isLoading && (
    <StyledLoader
      small={small}
      width={width}
      height={height}
      padding={padding}
      {...props}
    >
      <StyledSpinner text={text} small={small}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </StyledSpinner>
      {text && <StyledSpan>{text}</StyledSpan>}
    </StyledLoader>
  );

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  small: PropTypes.bool,
};

export { Loader };
