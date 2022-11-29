import { csv2json } from "../calculation/csv2json"

interface Props {
    ticker: string,
    from_timestamp: string,
    to_timestamp: string,
    interval: string,
}

export async function getData(props: Props) {

    // Ticker will be capalized: goog -> GOOG
    const res = await fetch(`/${props.ticker}?period1=${props.from_timestamp}&period2=${props.to_timestamp}&interval=${props.interval}&events=history&crumb=5YTX%2FgVGBmg`)

    // Check if status 200
    console.log(res)
    if (res.status === 200) {
        let text_data = await res.text()
        text_data = text_data.replace("Date,Open,High,Low,Close,Adj Close,Volume", "time,open,high,low,close,Adj Close,Volume")
        const json_data = csv2json(text_data)
        return json_data
    }
    else {
        // Check if status != 200
        // return not found
        return "Error"
    }

}