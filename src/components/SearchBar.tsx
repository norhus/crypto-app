import React, { useRef } from "react";
import "./SearchBar.css";

interface Props {
  onSearch: (newSearchInput: string) => void;
}

const SearchBar: React.FC<Props> = (props) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let submittedSearchInput = searchInput.current?.value;
    if (submittedSearchInput) {
      props.onSearch(submittedSearchInput);
    } else {
      props.onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar">
      <input type="search" placeholder="Search asset" ref={searchInput}></input>
      <button type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
};

export default SearchBar;
