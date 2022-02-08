import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { FilterContext } from "../contexts/FilterContext";
import { useMovieList } from "../hooks/useMovieList";
import { MovieCard } from "./MovieCard";
import { Loader } from "../shared/components";
import { colors, breakpoints } from "../theme";

const MovieListWrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
  overflow-y: auto;
  height: calc(100vh - 80px);

  @media (max-width: ${breakpoints.tab}) {
    height: calc(100vh - 200px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: calc(100vh - 240px);
  }
`;

const MovieListEmpty = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const MovieListError = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 50px;
  color: ${colors.error};
`;

const ResultText = styled.div`
  color: ${colors.textMain};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  margin: 25px 0px 10px 25px;

  @media (max-width: ${breakpoints.tab}) {
    margin: 30px 0px 30px 5px;
  }
`;

const StyledLoader = styled(Loader)`
  margin-top: 25px;
`;

/**
 * Render search results as list of items
 * @param {string} selectedMovie: selected movie to render details on the movie details container
 * @param {func} setSelectedMovie: state changing function for set the selected movie. this will be passed to the onClick prop in MovieCard component.
 */
const MovieList = ({ selectedMovie, setSelectedMovie }) => {
  const { filters } = useContext(FilterContext);
  const { min, max } = filters.year;

  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useMovieList({
      year: `${min}-${max}`,
      type: filters.type,
      search: filters.search,
    });

  // function to handle the infinite behavior of the search results
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <MovieListWrapper onScroll={handleScroll} role="list" tabIndex={0}>
      {!!data?.pages[0].data.totalResults && (
        <ResultText>{`${data?.pages["0"].data.totalResults} Results (${min}-${max})`}</ResultText>
      )}
      {!isLoading &&
        data?.pages?.map((page) =>
          page?.data?.Search?.map(({ Title, Year, Poster, imdbID }) => (
            <MovieCard
              key={imdbID}
              imageUrl={Poster}
              year={Year}
              title={Title}
              imdbId={imdbID}
              selectedId={selectedMovie}
              onClick={setSelectedMovie}
            />
          ))
        )}
      {!data?.pages[0].data.totalResults && !isLoading && (
        <MovieListEmpty>
          List is Empty. Please type a valid movie name.
        </MovieListEmpty>
      )}
      {error && <MovieListError>Error Loading Movie List</MovieListError>}
      {(isLoading || isFetching) && (
        <StyledLoader isLoading data-testid="loader" />
      )}
    </MovieListWrapper>
  );
};

MovieList.propTypes = {
  selectedMovie: PropTypes.string,
  setSelectedMovie: PropTypes.func,
};

export { MovieList };
