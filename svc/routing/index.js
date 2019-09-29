import LaMetric from "../api/LaMetric";
import {BossTimer, TimeUtility} from "../util/";
import util from 'util';
import {config} from './../index';

/**
 * Handles incoming requests.
 * @param req {Request}
 * @param res {Response}
 */
function handleRequest(req, res) {
    BossTimer.fetchEstimation()
        .then(
            result => {
                let diff = TimeUtility.diff(result['estimate']);
                let response;

                if (diff.h > 0 && diff.m > 0)
                {
                    response = LaMetric.generateResponse(util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon'))
                } else {
                    let nowMessageSet = req.query.hasOwnProperty('nowMessage') && req.query['nowMessage'].length > 0;
                    response = LaMetric.generateResponse(nowMessageSet ? req.query['nowMessage'] : util.format('%s:%s', applyLeadingZeros(diff.h, req), applyLeadingZeros(diff.m, req)), config.get('icon'));
                }

                res.json(response);
            }
        )
        .catch(
            reason => {
                console.log(reason);
                res.json(LaMetric.generateResponse('Err ' + reason.statusCode, config.get('icon')));
            }
        )
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
