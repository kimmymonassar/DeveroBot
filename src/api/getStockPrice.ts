import axios from 'axios';

export default async function getStockPrice(symbol: string, argsFromMsg: string): Promise<string> {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
  );

  if (response.status === 200) {
    const obj = await response.data;
    const firstValueObject: any = Object.values(obj['Time Series (5min)'])[0];
    const valueArr = Object.values(firstValueObject);

    return `Latest stock prices for **$${argsFromMsg.toUpperCase()}**:
Open: $${valueArr[0]}
High: $${valueArr[1]}
Low: $${valueArr[2]}
Close: $${valueArr[3]}
Volume: ${valueArr[4]}`;
  }
  return 'Could not find any stock by that name';
}
