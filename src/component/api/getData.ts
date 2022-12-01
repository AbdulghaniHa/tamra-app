import { csv2json } from "../calculation/csv2json"

interface Props {
    ticker: string,
    from_timestamp: string,
    to_timestamp: string,
    interval: string,
}

export async function getData(props: Props) {

    // This will request a proxy server to avoid CORS error when deployed to production
    const yahooFinanceUrl = `https://query1.finance.yahoo.com/v7/finance/download/${props.ticker}?period1=${props.from_timestamp}&period2=${props.to_timestamp}&interval=${props.interval}&events=history`
    const url = `https://proxy.abdulghaniha.repl.co/getData?query=${yahooFinanceUrl}`
    const res = await fetch(url)
    
    // Check if status 200
    if (res.status === 200) {
        let text_data = await res.text()
        text_data = text_data.replace("Date,Open,High,Low,Close,Adj Close,Volume", "time,open,high,low,close,Adj Close,Volume")
        const json_data = csv2json(text_data)
        return {
            "data": json_data,
            "error": false
        }
    }
    else {
        // Check if status != 200
        // return not found
        return {
            "data": [],
            "error": true
        }
    }

}