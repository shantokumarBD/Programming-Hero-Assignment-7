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
