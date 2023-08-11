import React, { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { Asset, AssetFromCoinCap } from "../types/AssetTypes";
import SearchBar from "./SearchBar";

const Assets: React.FC = () => {
  const [assets, setAssets] = useState([]);
  const [searchInput, setsearchInput] = useState("");

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
    setsearchInput(newSearchInput);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <AssetsTable assets={assets} searchInput={searchInput} />;
    </div>
  );
};

export default Assets;
