import https from 'https';
import mcache from 'memory-cache';
import {config} from './../index';

/**
 * A class used to fetch data from <a href="https://github.com/InventivetalentDev">InventivetalentDevs</a> api.
 */
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
                            try
                            {
                                let parsedData = JSON.parse(data);
                                mcache.put(cacheKey, parsedData, config.get('cacheTimeout') * 1000);
                                resolve(parsedData);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }
                );

                req.on('error', (reason) => reject(reason));
            }
        );
    }

    /**
     * Get the estimation for the magma-boss.
     * @return {Promise<object>}
     */
    static magmaBoss() {
        return this.fetchData('magmaBoss');
    }

    /**
     * Get the estimation for the next new-year event.
     * @return {Promise<object>}
     */
    static newYear() {
        return this.fetchData('newYear');
    }

    /**
     * Get the estimation for the next dark-auction.
     * @return {Promise<object>}
     */
    static darkAuction() {
        return this.fetchData('darkAuction');
    }

    /**
     * Get the estimation for the interest timer.
     * @return {Promise<object>}
     */
    static interest() {
        return this.fetchData('interest');
    }

    /**
     * Get the estimation for the spooky festival timer.
     * @return {Promise<object>}
     */
    static spooky() {
        return this.fetchData('spooky');
    }

}
export default Timer;
