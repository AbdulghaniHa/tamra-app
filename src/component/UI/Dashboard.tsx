import { useState, useEffect } from "react"
import { getData } from "../api/getData"
import RenderChart from "../calculation/RenderChart"
import validateDate from "../calculation/validateDate"

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
    const [ visibleSMA, setVisibleSMA] = useState(false)
    const [ visibleRSI, setVisibleRSI] = useState(false)
    const [ loading, setLoading] = useState("")

    const [ fromYear, setFromYear] = useState("")
    const [ fromMonth, setFromMonth] = useState("")
    const [ fromDay, setFromDay] = useState("")

    const [ toYear, setToYear] = useState("")
    const [ toMonth, setToMonth] = useState("")
    const [ toDay, setToDay] = useState("")

    const [ error, setError] = useState("Loading ..")
    const [ timeframeSelected, setTimeframeSelected] = useState("1d")

    useEffect(() => {
        setTimeframeSelected(timeframe)
    }, [timeframe])

    const handelData = async () => {
        const obj = await getData({ticker: ticker, from_timestamp: timeFrom, to_timestamp: timeTo, interval: timeframe})
        if (!obj.error) setHistoricalData(obj.data)
        else setError(loading)
    }
    
    useEffect(() => {
        // get default data on first load
        handelData()
    }, [])

    useEffect(() => {
        const Obj = validateDate({Year: fromYear, Month: fromMonth, Day: fromDay})
        Obj.valid ? setTimeFrom(Obj.timestamp) : setLoading("Invalid date input")
    }, [fromDay, fromMonth, fromYear])

    useEffect(() => {
        const Obj = validateDate({Year: toYear, Month: toMonth, Day: toDay})
        Obj.valid ? setTimeTo(Obj.timestamp) : setLoading("Invalid date input")
    }, [toDay, toMonth, toYear])

    
    return (
    <>
        <div className="px-72">
        {
            !historicalData? error:
            <RenderChart width={1200} height={800} candlesData={historicalData || []} smaVisible={visibleSMA} rsiVisible={visibleRSI} smaRange={20}/>
        }
        </div>
    </>
  )
}

export default Dashboard