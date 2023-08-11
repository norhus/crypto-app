import React, { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { Asset, AssetFromCoinCap } from "../types/AssetTypes";

const Assets: React.FC = () => {
  const [assets, setAssets] = useState([]);

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

  return <AssetsTable assets={assets} />;
};

export default Assets;
