import https from 'https';
import mcache from 'memory-cache';
import {config} from './../index';

class Timer {

    /**
     * Fetches the estimated spawn time from the Magma-Boss-Timer api.
     * @param timerKey {string} The key of the the timers requestUrl item.
     * @return {Promise<object>}
     */
    static fetchData(timerKey) {
        return new Promise(
            (resolve, reject) => {

                // Check if request were already made
                let cacheKey = `__mbt-lametric_${timerKey}_response-cache`;
                let cachedResponse = mcache.get(cacheKey);
                if (cachedResponse)
                {
                    resolve(cachedResponse);
                    return;
                }

                // Fetch new data
                let data = '';
                let req = https.get(
                    config.get('requestUrl')[timerKey],

                    {
                        headers: {
                            'User-Agent': 'MBT-LaMetric/1.0'
                        },

                    },

                    res => {
                        res.on('data', (chunk) => data += chunk);
                        res.on('end', () => {
                            let parsedData = JSON.parse(data);
                            mcache.put(cacheKey, parsedData, config.get('cacheTimeout') * 1000);
                            resolve(parsedData);
                        });
                    }
                );

                req.on('error', (reason) => reject(reason));
            }
        );
    }

    /**
     * Get the estimation for the magma-boss.
     * @return {Promise<Object>}
     */
    static magmaBoss() {
        return this.fetchData('magmaBoss');
    }

}
export default Timer;
