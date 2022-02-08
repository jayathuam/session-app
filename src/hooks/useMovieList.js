import { useInfiniteQuery } from "react-query";

import axios from "../utils/axios";

/**
 * Return the movie search result based on the search string.
 * If the search string is equal to null of empty this will returns a empty object of data without calling to server
 * Query will return search results page by page on demand. one page includes 10 movie results
 * fetchNxtPage function can be used to fetch pages.
 * getNextPageParam function is responsible for returning a boolean value of availability of the next page
 * @param {string} search: search string
 * @param {string} type: type of the search
 * @param {string} year: details year range regarding to filter the movies. sample string: 1970-1980
 * @returns {object} returning a object includes next page details, current page details and function to fetch next page
 * sample object
 * {
 *  isLoading: initial loading status
 *  error: to check any errors
 *  data: results from the movie search
 *  fetchNxtPage: function to fetch next page
 *  hasNextPage: to check pages are available to fetch
 *  isFetching: returning number of calls are pending
 *  isFetchingNextPage: boolean to check next page on pending status
 * }
 */
const useMovieList = ({ search, year, type }) => {
  const result = useInfiniteQuery(
    ["movieList", search, year, type],
    async ({ pageParam = 1 }) => {
      if (!search) {
        return { isLoading: false, data: {} };
      }
      return await axios.get("", {
        params: {
          s: search,
          y: year,
          page: pageParam,
          type,
        },
      });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const numOfResults = Number(lastPage.data.totalResults);
        const numOfPages = Math.ceil(numOfResults / 10);
        const nextPage =
          pages.length + 1 <= numOfPages ? pages.length + 1 : undefined;
        return nextPage;
      },
    }
  );

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = result;

  return {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

export { useMovieList };
