import https from 'https';
import {config} from './../';
import mcache from 'memory-cache';

/**
 * A class for contacting the Magma-Boss-Timer.
 */
class BossTimer {

    /**
     * Fetches the estimated spawn time from the Magma-Boss-Timer api.
     * @return {Promise<object>}
     */
    static fetchEstimation() {
        return new Promise(
            (resolve, reject) => {

                // Check if request were already made
                let cacheKey = '__mbt-lametric__response-cache';
                let cachedResponse = mcache.get(cacheKey);
                if (cachedResponse)
                {
                    resolve(cachedResponse);
                    return;
                }

                // Fetch new data
                let data = '';
                let req = https.get(
                    config.get('requestUrl'),

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

}
export default BossTimer;
