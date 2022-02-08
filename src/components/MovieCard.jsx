import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { colors, breakpoints } from "../theme";
import placeholderImage from "../shared/img/placeholder.png";

const MovieCardWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 15px;
  padding: 25px;
  align-items: center;
  border-bottom: 1px solid ${colors.softText};
  background-color: ${({ selected }) =>
    selected ? colors.selectedBackground : "unset"};

  @media (max-width: ${breakpoints.tab}) {
    width: 170px;
    padding: 15px;
    gap: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const MovieTitle = styled.div`
  color: ${colors.textMain};
`;

const MovieYear = styled.div`
  padding-top: 5px;
  font-size: 14px;
  color: ${colors.softText};
`;

const MoviePoster = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

/**
 * This is use to render brief details of a movie in search result
 * @param {string} image : banner url of the movie, if url value is equal to N/A then static placeholder image will be displayed
 * @param {string} title :title fo the movie
 * @param {string} year: released year of the movie
 * @param {string} imdbId: unique identifier for a movie
 * @param {string} selectedId: id of the movie displayed in movie details container. This will be used to change the bg color of selected movie list item
 * @param {func} onClick: function to trigger when click on the movie list item
 */
const MovieCard = ({ imageUrl, title, year, imdbId, selectedId, onClick }) => {
  const image = imageUrl !== "N/A" ? imageUrl : placeholderImage;

  return (
    <MovieCardWrapper
      selected={selectedId === imdbId}
      onClick={() => onClick(imdbId)}
      role="listitem"
    >
      <MoviePoster src={image} alt={title} />
      <div>
        <MovieTitle>{title}</MovieTitle>
        <MovieYear>{year}</MovieYear>
      </div>
    </MovieCardWrapper>
  );
};

MovieCard.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  selectedId: PropTypes.string,
  imdbId: PropTypes.string,
  onClick: PropTypes.func,
};

export { MovieCard };
