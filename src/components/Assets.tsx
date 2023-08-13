import React, { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { Asset, AssetFromCoinCap, TableRowStyles } from "../types/AssetTypes";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import useWebSocket from "react-use-websocket";
import "./Assets.css";

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState({
    column: "rank",
    ordering: "ascending",
  });
  const [tableRowStyles, setTableRowStyles] = useState<TableRowStyles>({
    bitcoin: "tableRow",
    ethereum: "tableRow",
    monero: "tableRow",
    litecoin: "tableRow",
    dogecoin: "tableRow",
  });

  useWebSocket(
    "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,dogecoin",
    {
      onOpen: () => console.log("WebSocket connection opened."),
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: () => true,
      onMessage: (e: WebSocketEventMap["message"]) => processMessage(e),
    }
  );

  const processMessage = async (e: { data: string }) => {
    let newAssets: Asset[] = [...assets];
    let newTableRowStyles = { ...tableRowStyles };
    let response = JSON.parse(e.data);
    let keys = Object.keys(response);
    keys.forEach((key) => {
      newAssets = newAssets.map((asset: Asset) => {
        if (asset.name.toLowerCase() === key) {
          if (asset.priceUsd < response[key]) {
            newTableRowStyles[key] = "tableRowGreen";
          } else if (asset.priceUsd > response[key]) {
            newTableRowStyles[key] = "tableRowRed";
          } else {
            newTableRowStyles[key] = "tableRow";
          }
          return { ...asset, priceUsd: response[key] } as Asset;
        }
        return asset;
      });
    });
    setAssets(newAssets);
    setTableRowStyles(newTableRowStyles);
    setTimeout(
      () =>
        setTableRowStyles({
          bitcoin: "tableRow",
          ethereum: "tableRow",
          monero: "tableRow",
          litecoin: "tableRow",
          dogecoin: "tableRow",
        }),
      500
    );
  };

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
    <div className="assets">
      <div className="topBar">
        <SearchBar onSearch={handleSearch} />
        <SortSelect onSortChange={handleSortChange} sortBy={sortBy} />
      </div>
      <AssetsTable
        assets={assets}
        searchInput={searchInput}
        sortBy={sortBy}
        tableRowStyles={tableRowStyles}
      />
    </div>
  );
};

export default Assets;
