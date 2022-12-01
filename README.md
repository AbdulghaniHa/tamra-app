# TamraCapital stocks screener

This project live and published on [Vercel](https://tamracapital.vercel.app/).

## Libraries used

I have used an open source light weight charts library by TradingView.
This library allows to expand the X, Y axies for better price/date view, and display the candles in clean way without hurting the performance of the load,
since the library is open source you can add/modify any feature you like (Technical indicators, custom colors, alerts, custom candles type) and more.
Check the library [official documentation](https://tradingview.github.io/lightweight-charts/docs/) 

## Future work

Many suggestions to increase the user experience and the performance of the project on scale:
    - Using websockets for real-time flow of data.
    - Using state mangment to increase load time and performance.
    - Build a backtest feature for different strategies.
    - Navbar shows top gainers/losses stocks in the past 24 hours.
    - Small timeframes for short timeframe trades (5m, 15m, 1h, 4h).
    - Increase the number of most used technical indicators.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
