import Cases from '../models/cases.model';
import { logSuccess, logError } from '../api/util/logUtil';

export default async function listCases() {
  try {
    const csGoCases = await Cases.find().distinct('name', (error: string, names: string[]) => {
      if (error) {
        logError(`csGoCases query gave the error: ${error}`);
      }
      return names;
    });

    if (csGoCases) {
      let formattedCaseMsg = ``;
      csGoCases.forEach((caseItem: string) => {
        formattedCaseMsg = formattedCaseMsg + `${caseItem}\n`;
      });
      logSuccess(`Returned all CSGO cases`);
      return formattedCaseMsg;
    }
    return `Something went wrong: Could not fetch case list at the moment.`;
  } catch (e) {
    logError(`function listCases.ts threw error: ${e}`);
    return null;
  }
}
