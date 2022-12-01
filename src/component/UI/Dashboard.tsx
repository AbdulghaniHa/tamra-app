import { useState, useEffect } from "react"
import { getData } from "../api/getData"
import RenderChart from "../calculation/RenderChart"
import validateDate from "../calculation/validateDate"
import useViewport from "../hooks/useViewport"

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

    const { width, height } = useViewport();
    const [historicalData, setHistoricalData] = useState<CandlesType>()
    const [ timeframe, setTimeframe] = useState("1d")
    const [ timeFrom, setTimeFrom] = useState("1638317770")
    const [ timeTo, setTimeTo] = useState("1669853770")
    const [ ticker, setTicker] = useState("AAPL")
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
        <div className="">
            <div className="py-10 grid place-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-4 px-8 md:px-20 xl:px-30 2xl:px-80">

                <div className="w-full">
                <div className="flex flex-col">
                    <label className="self-start font-semibold">Ticker</label>
                    <div className="bg-white shadow-lg rounded-md">
                        <input type="text" placeholder="Stock symbol: AAPL" className="py-1 px-2 ml-2 w-48 h-14 focus:outline-none border-0 rounded-md" onChange={(e) => setTicker(e.currentTarget.value)}/>
                    </div>
                </div>

                </div>

                <div className="flex flex-col w-full">
                    <div className="self-start font-semibold">Timeframe</div>
                    <div className="flex bg-white text-gray-500 opacity-75 p-2 rounded-md shadow-lg divide-x divide-gray-400 text-center h-14 justify-around">
                        <div className={`hover:font-bold cursor-pointer self-center w-20 ${timeframeSelected === "1d"? "font-bold text-black opacity-100" : ""}`} onClick={() => setTimeframe("1d")}>1 Day</div>
                        <div className={`hover:font-bold cursor-pointer self-center w-20 ${timeframeSelected === "1wk"? "font-bold text-black opacity-100" : ""}`} onClick={() => setTimeframe("1wk")}>1 Week</div>
                        <div className={`hover:font-bold cursor-pointer self-center w-20 ${timeframeSelected === "1mo"? "font-bold text-black opacity-100" : ""}`} onClick={() => setTimeframe("1mo")}>1 Month</div>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="self-start font-semibold">Technical Indicator</div>
                    <div className="flex bg-white text-gray-500 opacity-75 p-2 rounded-md shadow-lg divide-x divide-gray-400 text-center h-14 justify-center">
                        <div className={`hover:font-bold cursor-pointer self-center w-20 ${visibleSMA? "font-bold text-black opacity-100" : ""}`} onClick={() => setVisibleSMA(!visibleSMA)}>SMA</div>
                        <div className={`hover:font-bold cursor-pointer self-center w-20 ${visibleRSI? "font-bold text-black opacity-100" : ""}`} onClick={() => setVisibleRSI(!visibleRSI)}>RSI</div>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="self-start font-semibold">From</label>
                    <div className="bg-white shadow-lg rounded-md">
                        {/* Date From */}
                        <input type="text" placeholder="2021" className="py-1 px-2 ml-2 w-14 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setFromYear(v.currentTarget.value)}/>
                        <input type="text" placeholder="/" disabled={true} className="bg-white py-1 w-8 md:w-3 h-14 focus:outline-none border-0 rounded-md text-center"/>
                        <input type="text" placeholder="12" className="py-1 px-2 ml-2 w-16 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setFromMonth(v.currentTarget.value)}/>
                        <input type="text" placeholder="/" disabled={true} className="bg-white py-1 w-8 md:w-3 h-14 focus:outline-none border-0 rounded-md text-center"/>
                        <input type="text" placeholder="01" className="py-1 px-2 ml-2 w-16 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setFromDay(v.currentTarget.value)}/>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="self-start font-semibold">To</label>
                    <div className="bg-white shadow-lg rounded-md w-auto">
                        {/* Date To */}
                        <input type="text" placeholder="2022" className="py-1 px-2 ml-2 w-14 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setToYear(v.currentTarget.value)}/>
                        <input type="text" placeholder="/" disabled={true} className="bg-white py-1 w-8 h-14 focus:outline-none border-0 rounded-md text-center"/>
                        <input type="text" placeholder="12" className="py-1 px-2 ml-2 w-16 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setToMonth(v.currentTarget.value)}/>
                        <input type="text" placeholder="/" disabled={true} className="bg-white py-1 w-8 h-14 focus:outline-none border-0 rounded-md text-center"/>
                        <input type="text" placeholder="01" className="py-1 px-2 ml-2 w-16 h-14 focus:outline-none border-0 rounded-md" onChange={(v) => setToDay(v.currentTarget.value)}/>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="self-start opacity-0">.</label>
                    <div className="bg-[#243161] text-white shadow-lg rounded-md" onClick={handelData}>
                        <button className="py-1 px-4 h-14 focus:outline-none border-0 rounded-md font-bold m-auto w-full">Apply</button>
                    </div>
                </div>
            </div>
        {
            !historicalData? <div className="grid place-items-center font-bold text-lg">{error}</div>:
            <RenderChart width={width} height={height} candlesData={historicalData || []} smaVisible={visibleSMA} rsiVisible={visibleRSI} smaRange={20} stock={ticker}/>
        }
        </div>
    </>
  )
}

export default Dashboard