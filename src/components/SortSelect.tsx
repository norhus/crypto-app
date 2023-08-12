import React from "react";

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
    <form onChange={handleChange}>
      <select name="column">
        <option value="rank">Rank</option>
        <option value="symbol">Symbol</option>
        <option value="name">Name</option>
        <option value="priceUsd">Price USD</option>
        <option value="changePercent24Hr">24h change %</option>
      </select>
      <input type="radio" name="ordering" value="ascending" defaultChecked />
      Ascending
      <input type="radio" name="ordering" value="descending" />
      Descending
    </form>
  );
};

export default SortSelect;
