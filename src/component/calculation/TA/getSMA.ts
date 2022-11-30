import { sma } from "indicatorts"
export const getSMA = (data: any, range: number) => {
  const closeArray = data.map((d: any) => Number(d.close));
  const smaArray = sma(range, closeArray);
  data = data.map((d: any, i: any) => ({ ...d, sma: smaArray[i] })).slice(range).filter((d: any) => d.sma)
  .map((d: any) => ({ time: d.time, value: d.sma }));

  return data
};
