import React, { memo } from "react";
import { SearchIcon } from "./searchIcon";
import "./searchBox.css";
type searchBoxType = {
  query: string;
  setQuery: (query: string) => void;
};
const SearchBox = ({ query, setQuery }: searchBoxType) => {
  return (
    <div className="flex">
      <div className="input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon height="16px" width="13px" fill="white" />
      </div>
    </div>
  );
};

export default memo(SearchBox);
