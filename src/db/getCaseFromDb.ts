import Cases from '../models/cases.model';
import { logSuccess, logError } from '../api/util/logUtil';
import getRarityStats from '../api/caseOpening/calculateCaseItem';
import formatRandomItem from '../api/caseOpening/filterCsItemsArray';

export default async function getCsgoCase(caseName: string, override = false) {
  try {
    /* Debug */
    const rarityStats = override
      ? {
          grade: 'Special',
          statTrak: false,
          color: '#FFD700',
          wear: 'Factory new',
          float: Math.random() * 0.1,
        }
      : getRarityStats();

    const specialOrRegular = rarityStats.grade === 'Special' ? 'specialItems' : 'items';
    if (specialOrRegular === 'specialItems') {
      rarityStats.grade = 'Special';
    }
    const csGoCase = await Cases.findOne({ name: caseName });

    if (csGoCase) {
      const obj = csGoCase.toObject();
      const formattedAndRandomized = formatRandomItem(obj, specialOrRegular, rarityStats);
      logSuccess(
        `Got CSGO case from DB with name:${caseName} and item: ${formattedAndRandomized.name} with statTrak:${rarityStats.statTrak}, wear: ${rarityStats.wear} and float: ${rarityStats.float}`,
      );
      return formattedAndRandomized;
    }
    return null;
  } catch (e) {
    logError(`function getCsgoCase.ts threw error: ${e}`);
    return null;
  }
}
