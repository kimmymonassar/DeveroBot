import Cases from '../models/cases.model';
import { logError, logSuccess } from '../api/util/logUtil';
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

    const objItemsPath = rarityStats.grade === 'Special' ? 'specialItems' : 'items';
    const csGoCase = await Cases.findOne({ name: { $regex: caseName, $options: 'i' } });

    if (csGoCase) {
      const obj = csGoCase.toObject();
      const formattedAndRandomized = formatRandomItem(obj, objItemsPath, rarityStats);
      logSuccess(
        `Got CSGO case from DB with name:${obj.name} and item: ${formattedAndRandomized.name} with statTrak:${rarityStats.statTrak}, wear: ${rarityStats.wear} and float: ${rarityStats.float}`,
      );
      return formattedAndRandomized;
    }
    return null;
  } catch (e) {
    logError(`function getCsgoCase.ts threw error: ${e}`);
    return null;
  }
}
