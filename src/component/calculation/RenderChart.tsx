import { useEffect, createRef, useState } from "react"
import { getSMA, getRSI } from "../calculation/TA"

declare const LightweightCharts: any;

interface Data {
    time: string,
    high: string,
    close: string,
    low: string,
    open: string,
    Volume: string,
    "Adj Close": string,
}

type DataType = Data[];

type Props = {
  width: number;
  height: number;
  candlesData: DataType;
  smaVisible: boolean;
  rsiVisible: boolean;
  smaRange: number;
  children?: never;
};

const RenderChart = (props: Props) => {

  let containerId = "advanced-chart-widget-container";
  const [high, setHigh] = useState(0)
  const [low, setLow] = useState(0)
  const [close, setClose] = useState(0)
  const [open, setOpen] = useState(0)

  const ref: {current: HTMLDivElement | null} = createRef();
  useEffect(() => {
    let refValue: any;

    if (ref.current) {
      const script = document.createElement("script");
      script.src = "./LightweightCharts.js";
      script.async = true;
      script.onload = () => {
        if (typeof LightweightCharts !== "undefined") {
        const chartProperties = {
            width:props.width,
            height:props.height,
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal
            },
            timeScale:{
                timeVisible:true,
                secondsVisible:true,
                visible: true,
            },
            pane: 0,
          }
            
            const chart = LightweightCharts.createChart(ref.current ,chartProperties);
            const candleSeries = chart.addCandlestickSeries();
            candleSeries.setData(props.candlesData);

            if (props.smaVisible) {
              const smaSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1.5, pane: 0 , width: 1200, height: 150});
              const smaData = getSMA(props.candlesData, props.smaRange)
              smaSeries.setData(smaData);
            }

            if (props.rsiVisible) {
              const rsiSeries = chart.addLineSeries({ color: 'black', lineWidth: 1, pane: 1 , width: 1200, height: 150});
              const rsiData = getRSI(props.candlesData)
              rsiSeries.setData(rsiData);
            }

            // OHLC Values:
            chart.subscribeCrosshairMove((param: any) => {
              const ohlc = param.seriesPrices.get(candleSeries)
              if (ohlc) {
                setHigh(Math.round(ohlc.high * 100) / 100)
                setClose(Math.round(ohlc.close * 100) / 100)
                setLow(Math.round(ohlc.low * 100) / 100)
                setOpen(Math.round(ohlc.open * 100) / 100)
              }
            })
        }
      }
      ref.current.appendChild(script);
      refValue = ref.current;
    }
    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild);
        }
      }
    }
  }, [props.candlesData]);

  return <><div className="bg-white w-screen">Open: {open} | High: {high} | Low: {low} | Close: {close}</div><div id={containerId} ref={ref} className="grid place-items-center" /></>;
}

export default RenderChart;
