import { sma } from "indicatorts"
export const getSMA = (data: any, range: number) => {
  const closeArray = data.map((d: any) => Number(d.close));
  const smaArray = sma(range, closeArray);
  data = data.map((d: any, i: any) => ({ ...d, sma: smaArray[i] }));

  return data.slice(range)
};
