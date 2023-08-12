import React from "react";
import { Asset } from "../types/AssetTypes";

interface Props {
  assets: Asset[];
  searchInput: string;
  sortBy: { column: string; ordering: string };
}

const AssetsTable: React.FC<Props> = (props) => {
  const { assets, searchInput, sortBy } = props;

  const sortFunc = () => {
    let ascending = sortBy.ordering === "ascending";
    if (
      sortBy.column === "rank" ||
      sortBy.column === "priceUsd" ||
      sortBy.column === "changePercent24Hr"
    ) {
      if (ascending) {
        return assets.sort(
          (a: Asset, b: Asset) => a[sortBy.column] - b[sortBy.column]
        );
      } else {
        return assets.sort(
          (a: Asset, b: Asset) => b[sortBy.column] - a[sortBy.column]
        );
      }
    } else {
      if (ascending) {
        return assets.sort((a: Asset, b: Asset) =>
          a[sortBy.column].toLowerCase() > b[sortBy.column].toLowerCase()
            ? 1
            : -1
        );
      } else {
        return assets.sort((a: Asset, b: Asset) =>
          a[sortBy.column].toLowerCase() < b[sortBy.column].toLowerCase()
            ? 1
            : -1
        );
      }
    }
  };

  const filterAndSort = () => {
    return sortFunc()
      .filter((asset) =>
        asset.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map((asset) => (
        <tr key={asset.name}>
          <td>{asset.rank}</td>
          <td>{asset.symbol}</td>
          <td>{asset.name}</td>
          <td>{asset.priceUsd}</td>
          <td>{asset.changePercent24Hr}</td>
        </tr>
      ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price USD</th>
          <th>24h change %</th>
        </tr>
      </thead>
      <tbody>{filterAndSort()}</tbody>
    </table>
  );
};

export default AssetsTable;
