import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";

import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { getData, saveData } from "../utils/localStorage";
import { FilterContext } from "../contexts/FilterContext";
import { colors, breakpoints } from "../theme";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  position: fixed;
`;

const List = styled.div`
  border-right: 1px solid ${colors.softText};
  overflow-y: hidden;
  width: 350px;

  @media (max-width: ${breakpoints.tab}) {
    width: 200px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: ${({ isMobileVisible }) => (isMobileVisible ? "unset" : "none")};
  }
`;

const Details = styled.div`
  margin-top: 25px;
  flex-grow: 1;

  @media (max-width: ${breakpoints.tab}) {
    margin-left: 10px;
    margin-right: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isMobileVisible }) => (isMobileVisible ? "unset" : "none")};
    height: calc(100vh - 240px);
    overflow-y: auto;
  }
`;

const Content = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [watchList, setWatchList] = useState(getData("watchList"));
  const [showDetails, setShowDetails] = useState(false);
  const { filters } = useContext(FilterContext);

  useEffect(() => {
    setShowDetails(false);
    setSelectedMovie("");
  }, [filters]);

  const updateSelectedMovie = (id) => {
    setSelectedMovie(id);
    setShowDetails(true);
  };

  const updateWatchList = ({ id, value }) => {
    let newData;
    if (value) {
      newData = { ...watchList, ...{ [id]: value } };
    } else {
      newData = { ...watchList };
      delete newData[id];
    }
    saveData("watchList", newData);
    setWatchList(newData);
  };

  return (
    <Wrapper>
      <List isMobileVisible={!showDetails}>
        <MovieList
          setSelectedMovie={updateSelectedMovie}
          selectedMovie={selectedMovie}
        />
      </List>
      <Details isMobileVisible={showDetails}>
        <MovieDetails
          selectedMovie={selectedMovie}
          watchList={watchList}
          updateWatchList={updateWatchList}
          setShowDetails={setShowDetails}
        />
      </Details>
    </Wrapper>
  );
};

export { Content };
