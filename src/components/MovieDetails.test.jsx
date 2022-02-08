import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { MovieDetails } from "./MovieDetails.jsx";
import { useMovieDetails } from "../hooks/useMovieDetails";
import placeholder from "../shared/img/placeholder.png";

jest.mock("../hooks/useMovieDetails", () => ({
  useMovieDetails: jest.fn(),
}));

const mockProps = {
  selectedMovie: "001",
  updateWatchList: jest.fn(),
  watchList: {},
  setShowDetails: jest.fn(),
};

const mockDataMovie = {
  Title: "Batman v Superman: Dawn of Justice",
  Year: "2016",
  Rated: "PG-13",
  Runtime: "152 min",
  Genre: "Action, Adventure, Sci-Fi",
  Actors: "Ben Affleck, Henry Cavill, Amy Adams",
  Plot: "Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
  Poster: placeholder,
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "6.4/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "29%",
    },
    {
      Source: "Metacritic",
      Value: "44/100",
    },
  ],
  Metascore: "44",
  imdbRating: "6.4",
  imdbVotes: "670,863",
  imdbID: "tt2975590",
  Type: "movie",
  DVD: "19 Jul 2016",
  BoxOffice: "$330,360,194",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

describe("Movie details components", () => {
  it("Display loading status", async () => {
    useMovieDetails.mockImplementation(() => ({
      isLoading: true,
    }));
    const wrapper = render(<MovieDetails {...mockProps} />);
    await waitFor(() => {
      expect(wrapper.getByTestId("loader")).toBeDefined();
    });
  });
  it("Display error status", async () => {
    useMovieDetails.mockImplementation(() => ({
      isLoading: false,
      error: "this is a error",
    }));
    render(<MovieDetails {...mockProps} />);
    await waitFor(() => {
      expect(screen.getByText("Error Loading Movie Details....")).toBeDefined();
    });
    expect(useMovieDetails).toHaveBeenCalledWith({ id: "001" });
  });
  it("Display text when we have no selected movie to display details", async () => {
    useMovieDetails.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: null,
    }));
    render(<MovieDetails {...mockProps} selectedMovie="" />);
    await waitFor(() => {
      expect(
        screen.getByText("Waiting For Image To Select......")
      ).toBeDefined();
    });
    expect(useMovieDetails).toHaveBeenCalledWith({ id: "" });
  });
  it("Display movie details when we have data", async () => {
    useMovieDetails.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: mockDataMovie,
    }));
    render(<MovieDetails {...mockProps} selectedMovie="001" />);
    await waitFor(() => {
      expect(screen.getByText(mockDataMovie.Title)).toBeDefined();
      expect(screen.getByText(mockDataMovie.Actors)).toBeDefined();
      expect(screen.getByText(mockDataMovie.Plot)).toBeDefined();
    });
    const viewButton = screen.getByRole("button", {
      "aria-label": "add movie to watch list",
    });
    const image = screen.getByRole("img");
    fireEvent.click(viewButton);
    expect(mockProps.updateWatchList).toHaveBeenCalledTimes(1);
    expect(useMovieDetails).toHaveBeenCalledWith({ id: "001" });
    expect(image).toHaveAttribute("src", placeholder);
  });
});
