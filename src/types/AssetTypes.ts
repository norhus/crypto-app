export interface AssetFromCoinCap {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
}

export interface Asset extends Record<string, any> {
  rank: number;
  symbol: string;
  name: string;
  priceUsd: number;
  changePercent24Hr: number;
}

export interface TableRowStyles extends Record<string, any> {
  bitcoin: string;
  ethereum: string;
  monero: string;
  litecoin: string;
  dogecoin: string;
}
