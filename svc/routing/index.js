import LaMetric from "../api/LaMetric";
import {BossTimer, TimeUtility} from "../util/";
import util from 'util';
import mcache from 'memory-cache';
import {config} from './../index';

/**
 * Handles incoming requests.
 * @param req {Request}
 * @param res {Response}
 */
function handleRequest(req, res) {

    //Check cache to prevent mass requests to the mbt-api
    let cacheKey = '__mbt-lametric__response-cache';
    let cachedResponse = mcache.get(cacheKey);

    if (cachedResponse)
    {
        res.json(cachedResponse);
    }
    else
    {
        //Fetch data from mbt-api
        BossTimer.fetchEstimation()
            .then(
                result => {
                    const diff = TimeUtility.diff(result['estimate']);
                    const response = LaMetric.generateResponse( util.format('%s:%s', diff.h, diff.m), config.get('icon') );
                    mcache.put(cacheKey, response, config.get('cacheTimeout') * 1000);
                    res.json(response);
                }
            )
            .catch(
                reason => {
                    console.log(reason);
                    res.json(LaMetric.generateResponse( 'Err ' + reason.status, config.get('icon') ));
                }
            )
    }

}

export {
    handleRequest
}
