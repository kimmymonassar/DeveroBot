/**
 * @module LogUtil
 */
import { getLogger } from 'log4js';
import createDbErrorMsg from '../db/addErrorToDb';

const logger = getLogger();
logger.level = 'debug';

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logError = (message: string): void => {
  logger.error(message);
  createDbErrorMsg(message, 'error');
};

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logWarning = (message: string): void => {
  logger.warn(message);
};

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logSuccess = (message: string): void => {
  logger.info(message);
};

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logTrace = (message: string): void => {
  logger.trace(message);
};

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logDebug = (message: string): void => {
  logger.debug(message);
};

/**
 * @param {string} message
 * @return {void} Nothing
 */
const logFatal = (message: string): void => {
  logger.fatal(message);
  createDbErrorMsg(message, 'error');
};

export { logError, logWarning, logTrace, logSuccess, logDebug, logFatal };
