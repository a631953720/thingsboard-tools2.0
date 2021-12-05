import axios, { AxiosRequestConfig } from 'axios';
import WinstonLogger from './loggers';

const loggers = new WinstonLogger({ type: 'API caller' });

/**
 * @typedef {object} defaultError Default error object
 * @property {number} status
 * @property {object} data
 * @property {string} data.message
 */

/**
 * Call API by axios
 * @param {object} configs Http request options
 * @param {string} configs.method
 * @param {string} configs.url
 * @param {object} configs.headers
 * @returns {Promise | defaultError} If request successful return data, else return default error
 */
async function APICaller(configs: AxiosRequestConfig) {
    try {
        const res = await axios(configs);
        return res.data;
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = {
                status: error.response.status,
                data: error.response.data,
                url: error.response.config.url,
            };

            // showErrorLog('APICaller error', errorMessage);
            loggers.error(errorMessage, 'APICaller error 1');

            return errorMessage;
            // eslint-disable-next-line no-else-return
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            loggers.error({ message: error.request }, 'APICaller error 2');
            return {
                status: 500,
                data: error.request,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            loggers.error({ message: error.message }, 'APICaller error 3');
            return {
                status: 500,
                data: {
                    message: error.message,
                },
            };
        }
    }
}

export default APICaller;
