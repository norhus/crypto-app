import React from "react";
import { Asset } from "../types/AssetTypes";

interface Props {
  assets: Asset[];
  searchInput: string;
  sortBy: { column: string; ordering: string };
}

const AssetsTable: React.FC<Props> = (props) => {
  const { assets, searchInput, sortBy } = props;

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
      <tbody>
        {assets
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
          ))}
      </tbody>
    </table>
  );
};

export default AssetsTable;
