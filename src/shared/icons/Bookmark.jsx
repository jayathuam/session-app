import React from "react";
import PropTypes from "prop-types";

import { colors } from "../../theme";

const Bookmark = ({ width, height, color, ...rest }) => (
  <svg height={height || 24} viewBox="0 0 24 24" width={width || 24} {...rest}>
    <path
      fill={color || colors.textBlack}
      d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
    />
  </svg>
);

Bookmark.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default Bookmark;
