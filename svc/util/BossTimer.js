import https from 'https';
import {config} from './../';

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
                        res.on('end', () => resolve(JSON.parse(data)));
                    }
                );

                req.on('error', (reason) => reject(reason));
            }
        );
    }

}
export default BossTimer;
