import { useQuery } from "react-query";

import axios from "../utils/axios";

/**
 * Hook to return movie details for specific unique id
 * @param {string} id: imdbId of the movie which need to get the details
 * @returns {object} returns a object which contains different status of the data fetching process
 * example object
 * {
 *  isLoading: false,
 *  error: null,
 *  data: {
 *    Title: "",
 *    Year: "",
 *    Plot: "",
 *    ...
 *  },
 * }
 */
const useMovieDetails = ({ id }) => {
  const { isLoading, error, data } = useQuery(
    ["movieDetails", id],
    async () => {
      if (!id) {
        return { isLoading: false, data: undefined };
      }
      return await axios.get("", {
        params: {
          I: id,
        },
      });
    }
  );

  return {
    isLoading,
    error,
    data: data?.data || undefined,
  };
};

export { useMovieDetails };
