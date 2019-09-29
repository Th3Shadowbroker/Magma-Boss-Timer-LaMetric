import LaMetric from "../api/LaMetric";
import TimeUtility from "../util/TimeUtility";
import Timer from "../api/Timer";
import util from 'util';
import {config} from './../index';

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
                console.log(reason);
                res.json(LaMetric.generateResponse('Err ' + reason.statusCode, config.get('icon')['magmaBoss']));
            }
        )
}

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

            default:
                res.sendStatus(404);
                return;
        }

        timerPromise.then(
            result => {
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

                res.json(response);
            }
        )
            .catch(
                reason => {
                    console.log(reason);
                    res.json(LaMetric.generateResponse('Err ' + reason.statusCode, config.get('icon')[timerName]));
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
    handleLegacyRequest,
    handleRequest
}
