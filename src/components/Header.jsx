import React from "react";
import styled from "@emotion/styled";

import { Search } from "./Search";
import { Filters } from "./Filters";
import { colors, breakpoints } from "../theme";

const Wrapper = styled.div`
  background-color: ${colors.secondaryMain};
  color: ${colors.secondaryText};
  position: sticky;
  top: 0;
  height: 80px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tab}) {
    height: 200px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: unset;
    height: 240px;
  }
`;

const StyledSearch = styled(Search)`
  flex-grow: 1;
  @media (max-width: ${breakpoints.tab}) {
    margin-top: 25px;
  }
`;

const Header = () => {
  return (
    <Wrapper role="search">
      <StyledSearch />
      <Filters />
    </Wrapper>
  );
};

export { Header };
