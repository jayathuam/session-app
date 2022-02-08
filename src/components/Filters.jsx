import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { FilterContext } from "../contexts/FilterContext";
import { Radio } from "../shared/components";
import { breakpoints } from "../theme";

const FilterItemsWrapper = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: ${breakpoints.tab}) {
    gap: 40px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled.div`
  align-self: center;
`;

const Filters = ({ ...rest }) => {
  const { filters, setFilters } = useContext(FilterContext);
  const onRadioChange = (value) => {
    setFilters({ ...filters, type: value });
  };

  // const onYearChange = (value) => {
  //   setFilters({ ...filters, year: value });
  // };

  return (
    <FilterItemsWrapper {...rest}>
      <StyledLink>
        <Link to="watchlist">Goto WatchList</Link>
        {/* <YearSelector
          min={1950}
          max={2022}
          value={filters.year}
          onChange={(year) => onYearChange(year)}
        /> */}
      </StyledLink>
      <div>
        <StyledLabel>Type</StyledLabel>
        <RadioGroup role="radiogroup" aria-label="select movie type">
          <Radio
            value=""
            selected={filters.type}
            text="Any"
            onChange={(value) => onRadioChange(value)}
          />
          <Radio
            value="movie"
            selected={filters.type}
            text="Movies"
            onChange={(value) => onRadioChange(value)}
          />
          <Radio
            value="series"
            selected={filters.type}
            text="Series"
            onChange={(value) => onRadioChange(value)}
          />
          <Radio
            value="episode"
            selected={filters.type}
            text="Episodes"
            onChange={(value) => onRadioChange(value)}
          />
        </RadioGroup>
      </div>
    </FilterItemsWrapper>
  );
};

export { Filters };
