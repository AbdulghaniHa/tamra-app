import { useState, useEffect } from "react"
import { getData } from "../api/getData"
import RenderChart from "../calculation/RenderChart"

interface Candles {
    time: string,
    high: string,
    close: string,
    low: string,
    open: string,
    Volume: string,
    "Adj Close": string,
}

type CandlesType = Candles[];


function Dashboard() {
    const [historicalData, setHistoricalData] = useState<CandlesType>()
    const [ timeframe, setTimeframe] = useState("")
    const [ timeFrom, setTimeFrom] = useState("")
    const [ timeTo, setTimeTo] = useState("")
    const [ ticker, setTicker] = useState("GOOG")
    const [ visible, setVisible] = useState(false)
    const [ loading, setLoading] = useState("Loading ..")



    const handelData = async () => {
        const data = await getData({ticker: ticker, from_timestamp: "1633381200", to_timestamp: "1664917199", interval: "1d"})
        data !== "Error" ? setHistoricalData(data) : setLoading("Invalid symbol")
    }
    
    useEffect(() => {
        // get default data on first load
        handelData()
    }, [])


    return (
    <>
        <RenderChart width={1200} height={800} candlesData={historicalData || []} smaVisible={visible}/>
    </>
  )
}

export default Dashboard