import cron from 'node-cron';
import { UserVisitCounter } from './UserVisitCounter.js';


class UserVisitAggreationScheduler {
    /**
     * @param {UserVisitCounter} userVisitCounter 
     */
    constructor(userVisitCounter) {
        /** @type {UserVisitCounter} */
        this._userVisitCounter = userVisitCounter;
        /** @type {cron.ScheduledTask} */
        this._task = null;
        /** @type {Boolean} */
        this._aggregating = false;
    }

    schedule() {
        if (!this._task) {
            this._task = cron.schedule('0 1 1 * *', async () => {
                await this.aggregateIfRequired();
            });
        }
    }

    async aggregateIfRequired() {
        if (!this._aggregating) {
            this._aggregating = true;
    
            try {
                const today = new Date();
                const tillDate = new Date(today.getFullYear(), today.getMonth() - 1);
    
                await this.aggregate(tillDate.getFullYear(), tillDate.getMonth());
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this._aggregating = false;
            }
        }
    }
}


export {
    UserVisitAggreationScheduler
};
