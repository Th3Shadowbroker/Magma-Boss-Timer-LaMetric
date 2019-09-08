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
                    let response = LaMetric.generateResponse( util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon') );
                    mcache.put(cacheKey, response, config.get('cacheTimeout') * 1000);
                    res.json(response);
                }
            )
            .catch(
                reason => {
                    console.log(reason);
                    res.json(LaMetric.generateResponse( 'Err ' + reason.statusCode, config.get('icon') ));
                }
            )
    }

}

/**
 * Applies the leadingZeros query-parameter.
 * @param num {number}
 * @param req {Request}
 * @return {string|number}
 */
function applyLeadingZeros(num, req) {
    if (req.query.hasOwnProperty('leadingZeros') && req.query.leadingZeros === 'true') {
        if (num < 10) {
            return '0' + num;
        }
    }
    return num;
}

export {
    handleRequest
}
