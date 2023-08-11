import React, { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { Asset, AssetFromCoinCap } from "../types/AssetTypes";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

const Assets: React.FC = () => {
  const [assets, setAssets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState({
    column: "Rank",
    ordering: "Ascending",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    axios.get("https://api.coincap.io/v2/assets").then((response) => {
      let fetchedAssets = response.data.data.map((asset: AssetFromCoinCap) =>
        extractData(asset)
      );
      setAssets(fetchedAssets);
    });
  };

  const extractData = ({
    rank,
    symbol,
    name,
    priceUsd,
    changePercent24Hr,
  }: AssetFromCoinCap) => {
    return { rank, symbol, name, priceUsd, changePercent24Hr } as Asset;
  };

  const handleSearch = (newSearchInput: string) => {
    setSearchInput(newSearchInput);
  };

  const handleSortChange = (newColumn: string, newOrdering: string) => {
    setSortBy({ column: newColumn, ordering: newOrdering });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SortSelect onSortChange={handleSortChange} sortBy={sortBy} />
      <AssetsTable assets={assets} searchInput={searchInput} sortBy={sortBy} />;
    </div>
  );
};

export default Assets;
