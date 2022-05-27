// @flow
import axios from "axios";

export const DCRDATA_URL_TESTNET = "https://testdata.dcrn.xyz/api";
export const DCRDATA_URL_MAINNET = "https://data.dcrn.xyz/api";

const GET = (path) => {
  return axios.get(path);
};

export const getTreasuryInfo = (daURL, treasuryAddress) => GET(daURL + "/address/" + treasuryAddress + "/totals");
