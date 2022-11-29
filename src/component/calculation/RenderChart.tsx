import { useEffect, createRef } from "react"

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
  children?: never;
};

const RenderChart = (props: Props) => {

  let containerId = "advanced-chart-widget-container";

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

  return <div id={containerId} ref={ref} className="grid place-items-center" />;
}

export default RenderChart;
