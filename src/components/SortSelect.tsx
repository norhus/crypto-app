import React from "react";

interface Props {
  onSortChange: (newColumn: string, newOrdering: string) => void;
  sortBy: { column: string; ordering: string };
}

const SortSelect: React.FC<Props> = (props) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.name === "column") {
      props.onSortChange(e.target.value, props.sortBy.ordering);
    } else {
      props.onSortChange(props.sortBy.column, e.target.value);
    }
  };

  return (
    <form onChange={handleSelectChange}>
      <select name="column">
        <option value="Rank">Rank</option>
        <option value="Symbol">Symbol</option>
        <option value="Name">Name</option>
        <option value="Price USD">Price USD</option>
        <option value="24h change %">24h change %</option>
      </select>
      <input type="radio" name="ordering" value="Ascending" defaultChecked />
      Ascending
      <input type="radio" name="ordering" value="Descending" />
      Descending
    </form>
  );
};

export default SortSelect;
