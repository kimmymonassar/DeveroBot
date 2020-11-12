import axios from 'axios';

const shortenDecimals = (input: any) => {
  return parseFloat(input).toFixed(2);
};

export default async function getCryptoData(): Promise<string> {
  const { data } = await axios.get(
    `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API_KEY}&ids=BTC,ETH,XRP&interval=1d,30d&convert=USD&per-page=100&page=1`,
  );

  const transformedData = data.map((item: any) => {
    return {
      name: item.name,
      symbol: item.symbol,
      price: shortenDecimals(item.price),
      priceChange1d: `${shortenDecimals(item['1d'].price_change_pct * 100)}%`,
      priceChange30d: `${shortenDecimals(item['30d'].price_change_pct * 100)}%`,
    };
  });

  return `**Crypto prices:**
**${transformedData[0].name} (${transformedData[0].symbol})**
$${transformedData[0].price}
Change 1 day: ${transformedData[0].priceChange1d}
Change 30 days: ${transformedData[0].priceChange30d}
---------------------------------------------------------
**${transformedData[1].name} (${transformedData[1].symbol})**
$${transformedData[1].price}
Change 1 day: ${transformedData[1].priceChange1d}
Change 30 days: ${transformedData[1].priceChange30d}
---------------------------------------------------------
**${transformedData[2].name} (${transformedData[2].symbol})**
$${transformedData[2].price}
Change 1 day: ${transformedData[2].priceChange1d}
Change 30 days: ${transformedData[2].priceChange30d}
---------------------------------------------------------`;
}
