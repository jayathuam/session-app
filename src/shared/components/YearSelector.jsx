import React, { useState } from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import styled from "@emotion/styled";
import "react-input-range/lib/css/index.css";

import { colors } from "../../theme";

const YearSelectorContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
  width: 200px;
  margin-top: 2px;

  .input-range {
    &__slider {
      background: ${colors.softText};
      border: none;
    }

    &__track {
      background: white;
    }

    &__track--active {
      background: ${colors.softText};
    }

    &__label--container,
    &__label--value,
    &__label--min,
    &__label--max {
      display: none;
    }
  }
`;

const YearSelector = ({ min, max, value, onChange, ...rest }) => {
  const [years, setYears] = useState(value);

  return (
    <YearSelectorContainer {...rest}>
      <span>{min}</span>
      <InputRange
        maxValue={max}
        minValue={min}
        value={years}
        onChange={(selectedYears) => setYears(selectedYears)}
        onChangeComplete={(selectedYears) => {
          onChange(selectedYears);
        }}
      />
      <span>{max}</span>
    </YearSelectorContainer>
  );
};

YearSelector.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.object,
};

export { YearSelector };
