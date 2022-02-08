import React from "react";
import PropTypes from "prop-types";

import { colors } from "../../theme";

const Lense = ({ width, height, color, ...rest }) => (
  <svg height={height || 12} viewBox="0 0 12 12" width={width || 12} {...rest}>
    <path
      fill={color || colors.textBlack}
      d="M11.8889 11.3606L8.57217 8.04187C9.30526 7.19062 9.74962 6.08437 9.74962 4.875C9.74962 2.18625 7.56345 0 4.87481 0C2.18616 0 0 2.18625 0 4.875C0 7.56375 2.18616 9.75 4.87481 9.75C6.08414 9.75 7.19034 9.30562 8.04156 8.5725L11.3583 11.8894C11.4333 11.9625 11.5289 12 11.6245 12C11.7202 12 11.8158 11.9625 11.8889 11.8894C12.037 11.7431 12.037 11.5069 11.8889 11.3606ZM4.87481 9C2.60052 9 0.749971 7.14937 0.749971 4.875C0.749971 2.60063 2.60052 0.75 4.87481 0.75C7.1491 0.75 8.99965 2.60063 8.99965 4.875C8.99965 7.14937 7.1491 9 4.87481 9Z"
    />
  </svg>
);

Lense.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default Lense;
