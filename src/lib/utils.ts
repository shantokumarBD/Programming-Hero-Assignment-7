import { MarketPrice } from "@/types";

// convert english number to bangla
export const toBnNum = (num: number | string) => {
  return new Intl.NumberFormat("bn-BD").format(Number(num));
};

// Unit
export const getUnitBn = (unit: string) => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (unit === "piece") return "পিস";
  return unit;
};

// Calculate market summary
export const calculateMarketSummary = (
  markets: MarketPrice[] | undefined,
  defaultTodayPrice: number,
) => {
  if (!markets || markets.length === 0) {
    return {
      lowestPrice: defaultTodayPrice,
      highestPrice: defaultTodayPrice,
      averagePrice: defaultTodayPrice,
      marketsWithAvg: [],
    };
  }

  const marketsWithAvg = markets.map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));

  const lowestPrice = Math.min(...markets.map((m) => m.min));
  const highestPrice = Math.max(...markets.map((m) => m.max));

  const averagePrice =
    marketsWithAvg.reduce((sum, m) => sum + m.avg, 0) / markets.length;

  return {
    lowestPrice,
    highestPrice,
    averagePrice,
    marketsWithAvg,
  };
};
