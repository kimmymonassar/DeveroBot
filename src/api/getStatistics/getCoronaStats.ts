import axios from 'axios';

export default async function getCoronaStats(country: string): Promise<string> {
  const { data } = await axios.get(`http://api.covid19api.com/dayone/country/${country}/status/confirmed`);
  const item = data.slice(-1)[0];
  return `
  Country: **${item.Country}**
  CountryCode: **${item.CountryCode}**
  Cases: **${item.Cases}**
  Status: **${item.Status}**
  Date: **${item.Date.split('T')[0]}**`;
}
