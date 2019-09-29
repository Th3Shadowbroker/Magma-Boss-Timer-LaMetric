import moment from "moment";

/**
 * A class that provides comparison methods for the estimated time.
 */
class TimeUtility {

    /**
     * Returns an object which contains the difference between present and estimation.
     * @param estimation {int} The unix timestamp of the estimation.
     * @return object
     */
    static diff(estimation) {
        let estimationMoment = moment.unix(estimation/1000);
        let presentMoment = moment();
        let diff = moment.duration(estimationMoment.diff(presentMoment));

        return {
            d: diff.days(),
            h: diff.hours(),
            m: diff.minutes(),
        }
    }

}
export default TimeUtility;
