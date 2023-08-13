import React from "react";
import "./SortSelect.css";

interface Props {
  onSortChange: (newColumn: string, newOrdering: string) => void;
  sortBy: { column: string; ordering: string };
}

const SortSelect: React.FC<Props> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.name === "column") {
      props.onSortChange(e.target.value, props.sortBy.ordering);
    } else {
      props.onSortChange(props.sortBy.column, e.target.value);
    }
  };

  return (
    <form onChange={handleChange} className="sortSelect">
      <select name="column">
        <option value="rank">Rank</option>
        <option value="symbol">Symbol</option>
        <option value="name">Name</option>
        <option value="priceUsd">Price USD</option>
        <option value="changePercent24Hr">24h change %</option>
      </select>
      <label>
        <input type="radio" name="ordering" value="ascending" defaultChecked />
        Ascending
      </label>
      <label>
        <input type="radio" name="ordering" value="descending" />
        Descending
      </label>
    </form>
  );
};

export default SortSelect;
