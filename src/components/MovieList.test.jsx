import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { MovieList } from "./MovieList";
import { useMovieList } from "../hooks/useMovieList";
import { FilterContext } from "../contexts/FilterContext";
import placeholder from "../shared/img/placeholder.png";

jest.mock("../hooks/useMovieList", () => ({
  useMovieList: jest.fn(),
}));

const mockedContextData = {
  filters: {
    year: { min: 1950, max: 2001 },
    type: "",
    search: "abc",
  },
};

const mockProps = {
  selectedMovie: "001",
  setSelectedMovie: jest.fn(),
};

const mockedMovieList = [
  {
    Title: "Guardians of the Galaxy",
    Year: "2014",
    imdbID: "tt2015381",
    Type: "movie",
    Poster: placeholder,
  },
  {
    Title: "Guardians of the Galaxy Vol. 2",
    Year: "2017",
    imdbID: "tt3896198",
    Type: "movie",
    Poster: placeholder,
  },
  {
    Title: "Guardians of the Galaxy: Inferno",
    Year: "2017",
    imdbID: "tt7131308",
    Type: "movie",
    Poster: placeholder,
  },
  {
    Title: "Plastic Galaxy: The Story of Star Wars Toys",
    Year: "2014",
    imdbID: "tt3648510",
    Type: "movie",
    Poster: placeholder,
  },
  {
    Title: "Power Rangers Lost Galaxy: Return of the Magna Defender",
    Year: "1999",
    imdbID: "tt0265640",
    Type: "movie",
    Poster: placeholder,
  },
  {
    Title:
      "LEGO Marvel Super Heroes - Guardians of the Galaxy: The Thanos Threat",
    Year: "2017",
    imdbID: "tt7387224",
    Type: "movie",
    Poster: placeholder,
  },
];

describe("Movie list components", () => {
  it("Display loading status", async () => {
    useMovieList.mockImplementation(() => ({
      isLoading: true,
    }));
    const wrapper = render(
      <FilterContext.Provider value={mockedContextData}>
        <MovieList {...mockProps} />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(wrapper.getByTestId("loader")).toBeDefined();
    });
  });
  it("Display error status", async () => {
    useMovieList.mockImplementation(() => ({
      isLoading: false,
      error: "this is a error",
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <MovieList {...mockProps} />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Error Loading Movie List")).toBeDefined();
    });
    expect(useMovieList).toHaveBeenCalledWith({
      year: "1950-2001",
      type: "",
      search: "abc",
    });
  });
  it("Display text when we have no movie list to display", async () => {
    useMovieList.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: null,
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <MovieList {...mockProps} />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByText("List is Empty. Please type a valid movie name.")
      ).toBeDefined();
    });
    expect(useMovieList).toHaveBeenCalledWith({
      year: "1950-2001",
      type: "",
      search: "abc",
    });
  });
  it("Display list when we have data", async () => {
    useMovieList.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: {
        pages: [
          {
            data: {
              Search: mockedMovieList,
              totalResults: 5,
            },
          },
        ],
      },
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <MovieList {...mockProps} />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Guardians of the Galaxy: Inferno")
      ).toBeDefined();
      expect(screen.getByText("5 Results (1950-2001)")).toBeDefined();
    });
    const image = screen.getByAltText("Guardians of the Galaxy");
    expect(image).toHaveAttribute("src", placeholder);
    const resultDiv = image.closest("div");
    fireEvent.click(resultDiv);
    expect(mockProps.setSelectedMovie).toHaveBeenCalledTimes(1);
    expect(mockProps.setSelectedMovie).toHaveBeenCalledWith("tt2015381");
  });
});
