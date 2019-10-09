import LaMetric from "../api/LaMetric";
import TimeUtility from "../util/TimeUtility";
import Timer from "../api/Timer";
import util from 'util';
import {config, log} from './../index';

/**
 * Handles incoming requests.
 * @param req {Request}
 * @param res {Response}
 */
function handleLegacyRequest(req, res) {
    Timer.magmaBoss()
        .then(
            result => {
                let diff = TimeUtility.diff(result['estimate']);
                let response;

                if ( diff.h > 0 || diff.m > 0 )
                {
                    response = LaMetric.generateResponse(util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon')['magmaBoss']);
                } else {
                    let nowMessageSet = req.query.hasOwnProperty('nowMessage') && req.query['nowMessage'].replace(' ', '').length > 0 ;
                    response = LaMetric.generateResponse(nowMessageSet ? req.query['nowMessage'] : util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon')['magmaBoss']);
                }

                res.json(response);
            }
        )
        .catch(
            reason => {
                log.error(reason);
                res.json(LaMetric.generateResponse('Err ' + reason.statusCode, config.get('icon')['magmaBoss']));
            }
        )
}

/**
 * Handles requests with timer-names.
 * @param req {Request}
 * @param res {Response}
 */
function handleRequest(req, res) {
    if (req.params.hasOwnProperty('timerName')) {
        let timerName = req.params.timerName;
        let timerPromise;

        switch (timerName)
        {

            case 'magmaBoss':
                timerPromise = Timer.magmaBoss();
                break;

            case 'newYear':
                timerPromise = Timer.newYear();
                break;

            case 'darkAuction':
                timerPromise = Timer.darkAuction();
                break;

            case 'interest':
                timerPromise = Timer.interest();
                break;

            default:
                res.sendStatus(404);
                return;
        }

        timerPromise.then( result => res.json( stringifyResults(req, result, timerName) ) )
            .catch(
                reason => {
                    log.error(reason);
                    res.json(LaMetric.generateResponse('Err ' + reason.statusCode, config.get('icon')[timerName]));
                }
            )
    }
}

/**
 * Handles requests to the <i>getEstimations</i> path.
 * @param req {Request}
 * @param res {Response}
 * @return {Promise<{frames: {test: string, icon: string}}>}
 */
async function handleSummary(req, res) {
    let magmaBoss = req.query.hasOwnProperty('magmaBoss') ? req.query.magmaBoss === 'true' : true;
    let darkAuction = req.query.hasOwnProperty('darkAuction') ? req.query.darkAuction === 'true' : true;
    let interest = req.query.hasOwnProperty('interest') ? req.query.interest === 'true' : true;
    let newYear = req.query.hasOwnProperty('newYear') ? req.query.newYear === 'true' : true;
    let summary = [];

    // Magma-Boss timer requested
    if (magmaBoss) {
        await Timer.magmaBoss().then( result =>  {
            summary.push( stringifyResults(req, result, 'magmaBoss').frames[0] );
        } );
    }

    // Dark-Auction timer requested
    if (darkAuction) {
        await Timer.darkAuction().then( result => {
            summary.push( stringifyResults(req, result, 'darkAuction').frames[0] );
        } );
    }

    // Interest timer requested
    if (interest) {
        await Timer.interest().then( result => {
            summary.push( stringifyResults(req, result, 'interest').frames[0] );
        } );
    }

    // New-year timer requested
    if (newYear) {
        await Timer.newYear().then( result => {
            summary.push( stringifyResults(req, result, 'newYear').frames[0] );
        } );
    }

    return {frames: summary};
}

/**
 * Logs an incoming request.
 * @param req {Request}
 * @param res {Response}
 * @param next {function}
 */
function logRequest(req, res, next) {
    let remoteAddress = req.headers.hasOwnProperty('x-forwarded-for') ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
    let userAgent = req.headers.hasOwnProperty('user-agent') ? req.headers['user-agent'] : 'Unknown/0.0';
    log.info(`[${remoteAddress}] ${req.method} ${userAgent}: ${req.url}`);
    next();
}

/**
 * "Stingifies" the results of a fetched result.
 * @param req {Request}
 * @param result {object}
 * @param timerName {string}
 * @return {{frames: {text: string, icon: string}}}
 */
function stringifyResults(req, result, timerName) {
    let diff = TimeUtility.diff(result['estimate']);
    let response;

    if ( diff.d > 0 || diff.h > 0 || diff.m > 0 )
    {                                    // When time difference to the estimation is at least 1 day.
        let formattedText = diff.d > 0 ? util.format('%s:%s:%s', applyLeadingZeros(diff.d, req), applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)) :
                                        // When time difference is less than 1 day.
                                        util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req));

        response = LaMetric.generateResponse(formattedText, config.get('icon')[timerName]);
    } else {
        let nowMessageSet = req.query.hasOwnProperty('nowMessage') && req.query['nowMessage'].replace(' ', '').length > 0 ;
        response = LaMetric.generateResponse(nowMessageSet ? req.query['nowMessage'] : util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon')[timerName]);
    }

    return response;
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
    handleLegacyRequest,
    handleRequest,
    handleSummary,
    logRequest
}
