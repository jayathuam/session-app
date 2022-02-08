import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { getData } from "../utils/localStorage";

const StyledLink = styled(Link)`
  margin-top: 20px;
  margin-left: 20px;
  display: block;
`;
const MovieList = styled.div`
  margin-top: 25px;
`;

const MovieEntry = styled.div`
  margin-left: 30px;
  margin-bottom: 20px;
`;

const WatchList = () => {
  const movieList = getData("watchList");
  console.log(Object.keys(movieList));
  return (
    <>
      <StyledLink to="/">&lt;- Go Back</StyledLink>
      <MovieList>
        {Object.keys(movieList).map((item) => (
          <MovieEntry key={item}>{item}</MovieEntry>
        ))}
      </MovieList>
    </>
  );
};

WatchList.propTypes = {};

export { WatchList };
