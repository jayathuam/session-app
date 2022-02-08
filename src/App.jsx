import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { WatchList } from "./components/WatchList";
import { FilterContext } from "./contexts/FilterContext";
import { defaultMaxYear, defaultMinYear } from "./config";

function App() {
  // initial status of the filters and the search string

  const Home = () => {
    const [filters, setFilters] = useState({
      search: "",
      year: { min: defaultMinYear, max: defaultMaxYear },
      type: "",
    });

    return (
      <FilterContext.Provider value={{ filters, setFilters }}>
        <Header />
        <Content />
      </FilterContext.Provider>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="watchlist" element={<WatchList />} />
    </Routes>
  );
}

export default App;
