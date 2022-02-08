import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { Loader } from "../shared/components";
import { BookmarkIcon } from "../shared/icons";
import { colors, breakpoints } from "../theme";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${breakpoints.tab}) {
    width: 450px;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 300px;
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 250px;
  border-radius: 5px;

  @media (max-width: ${breakpoints.tab}) {
    width: 200px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    align-self: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 350px;

  @media (max-width: ${breakpoints.mobile}) {
    width: unset;
  }
`;

const SaveButton = styled.button`
  height: 40px;
  border-radius: 5px;
  border: ${({ isBookmarked }) =>
    `1px solid ${isBookmarked ? colors.secondaryText : colors.colorBlack}`};
  color: ${({ isBookmarked }) =>
    isBookmarked ? colors.secondaryText : colors.secondaryMain};
  font-size: 16px;
  background: ${({ isBookmarked }) =>
    isBookmarked ? colors.softText : "none"};
  cursor: pointer;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;

  @media (max-width: ${breakpoints.mobile}) {
    margin-right: auto;
    margin-top: 10px;
  }
`;

const TitleInfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const InfoContainer = styled.div`
  margin-top: 15px;
  align-items: center;
  color: ${colors.softText};
  line-height: 26px;
`;

const Rating = styled.span`
  border: 1px solid ${colors.colorBlack};
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  color: ${colors.colorBlack};
`;

const Cast = styled.div`
  margin-top: 15px;
  color: ${colors.secondaryMain};
`;

const Plot = styled.div`
  width: 620px;
  margin: 25px auto;
  border-top: 1px solid ${colors.softText};
  color: ${colors.secondaryMain};
  border-bottom: 1px solid ${colors.softText};
  padding: 15px 0;

  @media (max-width: ${breakpoints.tab}) {
    width: 450px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 300px;
  }
`;

const OtherInfo = styled.div`
  width: 620px;
  margin: 25px auto;
  display: flex;
  color: ${colors.secondaryMain};

  @media (max-width: ${breakpoints.tab}) {
    width: 450px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 300px;
    padding-bottom: 25px;
  }
`;

const InfoBox = styled.div`
  flex-basis: 100%;
  text-align: center;
  border-right: 1px solid ${colors.softText};

  :last-child {
    border-right: none;
  }
`;

const RatingName = styled.div`
  margin-top: 10px;
  font-size: 12px;
`;

const StyledLoader = styled(Loader)`
  margin-top: 25px;
`;

const MovieListError = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 25px;
  color: ${colors.error};
`;

const MovieDetailsEmpty = styled.div`
  margin-top: 25px;
  text-align: center;
`;

const GoBack = styled.div`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    margin-bottom: 20px;
    font-weight: 500;
    text-decoration: underline;
    margin-left: 5px;
  }
`;

/**
 * Use to render details regarding a selected movie from the movie search result
 * @param {string} selectedMovie: movie id to get the details of the selected movie
 * @param {func} updateWatchList: function to update the watch list on local storage
 * @param {object} watchList: object containing data of the watch list movies
 * @param {func} setShowDetails: function to set the state to go back for movie search results in mobile view
 */
const MovieDetails = ({
  selectedMovie,
  updateWatchList,
  watchList,
  setShowDetails,
}) => {
  const { isLoading, error, data } = useMovieDetails({ id: selectedMovie });
  const isBookmarked = !!watchList[data?.imdbID];
  const handleBookmark = (id) => {
    updateWatchList({ id, value: !isBookmarked });
  };

  const placeHolderImage =
    "https://via.placeholder.com/250X360.png?text=no%20image";

  return (
    <>
      {!isLoading && (
        <GoBack onClick={() => setShowDetails(false)} role="link" tabIndex={0}>
          Go to list...
        </GoBack>
      )}

      {isLoading && <StyledLoader isLoading data-testid="loader" />}
      {error && (
        <MovieListError>Error Loading Movie Details....</MovieListError>
      )}
      {!data && !isLoading && !error && (
        <MovieDetailsEmpty>Waiting For Image To Select......</MovieDetailsEmpty>
      )}
      {data && (
        <>
          <ImageContainer>
            <Image
              src={data.Poster !== "N/A" ? data.Poster : placeHolderImage}
              alt={data.Title}
              tabIndex={0}
            />
            <TitleContainer>
              <SaveButton
                onClick={() => handleBookmark(data.imdbID)}
                isBookmarked={isBookmarked}
                aria-label="add movie to watch list"
              >
                <BookmarkIcon
                  width={20}
                  height={20}
                  color={
                    isBookmarked ? colors.secondaryText : colors.secondaryMain
                  }
                />
                Watchlist
              </SaveButton>
              <TitleInfoContainer>
                <Title>{data.Title}</Title>
                <InfoContainer>
                  <Rating>{data.Rated}</Rating>
                  <span>{`${data.Year}`}</span>
                  <span>{` | ${data.Genre}`}</span>
                  <span>{` | ${data.Runtime}`}</span>
                </InfoContainer>
                <Cast>{data.Actors}</Cast>
              </TitleInfoContainer>
            </TitleContainer>
          </ImageContainer>
          {data.Plot !== "N/A" && (
            <Plot tabIndex={0} aria-label={`plot of the movie. ${data.Plot}`}>
              {data.Plot}
            </Plot>
          )}
          <OtherInfo>
            {data.Ratings.map((item) => (
              <InfoBox key={item.Source}>
                <div>{item.Value}</div>
                <RatingName>{item.Source}</RatingName>
              </InfoBox>
            ))}
          </OtherInfo>
        </>
      )}
    </>
  );
};

MovieDetails.propTypes = {
  selectedMovie: PropTypes.string,
  updateWatchList: PropTypes.func,
  watchList: PropTypes.object,
  setShowDetails: PropTypes.func,
};

export { MovieDetails };
