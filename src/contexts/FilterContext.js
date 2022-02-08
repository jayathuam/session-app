import { createContext } from "react";

/**
 * This will be used to state management of the search string and other filters.
 * sample state object:
 * {
 *   search: string,
 *   year: {min: number, max: number},
 *   type: string, ["" || movie || episode || series]
 * }
 */
export const FilterContext = createContext({});
