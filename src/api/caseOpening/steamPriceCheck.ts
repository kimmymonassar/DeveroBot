import axios from 'axios';
import { logError } from '../util/logUtil';

function transformQualityName(name: string) {
  switch (name) {
    case 'Battle scarred':
      return 'Battle-Scarred';
    case 'Well worn':
      return 'Well-Worn';
    case 'Field tested':
      return 'Field-Tested';
    case 'Factory new':
      return 'Factory New';
    case 'Minimal wear':
      return 'Minimal Wear';
    default:
      return name;
  }
}

export default async function getPrice(
  itemName: string,
  wear: string,
  grade: string,
  statTrak: boolean,
): Promise<Record<string, any>> {
  try {
    if (statTrak) {
      itemName = encodeURIComponent('StatTrak™') + ' ' + itemName;
    }
    if (grade === 'Special') {
      itemName = encodeURIComponent('★ ') + itemName;
    }

    const { data } = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${itemName} (${transformQualityName(
        wear,
      )})`,
    );

    if (data.success) {
      return {
        lowest: data['lowest_price'],
        median: data['median_price'],
      };
    }
  } catch (e) {
    logError(`steamPriceCheck threw error: ${e.message}`);
  }

  return {
    lowest: null,
    median: null,
  };
}
