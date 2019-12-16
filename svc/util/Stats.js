class Stats {

    constructor() {
        this.highest = 0;
        this.rpm = 0;
    }

    increase() {
        this.rpm++;
    }

    reset() {
        if (this.rpm > this.highest) this.highest = this.rpm;
        this.rpm = 0;
    }

}
export default Stats;
