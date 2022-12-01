import { rsi } from "indicatorts"
export const getRSI = (data: any) => {
  const closeArray = data.map((d: any) => Number(d.close));
  const rsiArray = rsi(closeArray);
  data = data.map((d: any, i: any) => ({ ...d, rsi: rsiArray[i] })).filter((d: any) => d.rsi)
  .map((d: any) => ({ time: d.time, value: d.rsi }));

  return data
};
