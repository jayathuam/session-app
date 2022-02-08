import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import placeholder from "../shared/img/placeholder.png";
import { MovieCard } from "./MovieCard";
import { colors } from "../theme";

const onClick = jest.fn();
const mockProps = {
  imdbId: "0001",
  year: "2021",
  title: "abc",
  imageUrl: placeholder,
  selectedId: "0001",
  onClick,
};

describe("Movie card component", () => {
  it("Display all the data correctly", async () => {
    const wrapper = <MovieCard {...mockProps} />;
    render(wrapper);
    expect(screen.getByText("2021")).toBeDefined();
    expect(screen.getByText("abc")).toBeDefined();
    expect(screen.getByAltText("abc")).toHaveAttribute("src", placeholder);
    const item = screen.getByRole("listitem");
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("0001");
    expect(item).toHaveStyle(`background-color: ${colors.selectedBackground}`);
  });
});
