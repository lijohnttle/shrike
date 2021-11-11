import { UserVisit } from '../../../data/models/diagnostics/UserVisit.js';
import { UserVisitAggreationScheduler } from './UserVisitAggreationScheduler.js';


const DEFAULT_DAY_VISIT_COUNT_LIMIT = 100;


class Options {
    constructor() {
        /** @type {Number} */
        this.dayVisitCountLimit = null;
        /** @type {Number} */
        this.numberOfMonthsBeforeAggregation = null;
    }
}

class UserVisitCounter {
    /**
     * @param {Options} options 
     */
    constructor(options) {
        /** @type {Number} */
        this._dayVisitCountLimit = options.dayVisitCountLimit ?? DEFAULT_DAY_VISIT_COUNT_LIMIT;
        this._scheduler = new UserVisitAggreationScheduler(this);
    }

    scheduleAggregation() {
        this._scheduler.schedule();
    }

    /**
     * Get the number of visits.
     * @returns The number of visits today.
     */
    async getTodayVisitCount() {
        const today = new Date();

        return await UserVisit.count({
            date: {
                $gte: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
            }
        }).exec();
    }

    /**
     * Saves a user's visit.
     * @param {String} path 
     * @param {String} country 
     * @param {String} city 
     * @param {Date} date 
     */
    async recordVisit(path, country, city, date) {
        const todayVisitCount = await this.getTodayVisitCount();

        if (todayVisitCount < this._dayVisitCountLimit) {
            const userVisit = new UserVisit({
                path: path,
                locations: [
                    { country, city }
                ],
                date: date || new Date()
            });
            
            await userVisit.save();
        }
    }

    /**
     * Aggregates all visits into one record.
     * @param {Number} tillYear The year of the month till which aggregation is required.
     * @param {Number} tillMonth The month till which aggregation is required (not including).
     */
    async aggregate(tillYear, tillMonth) {
        
        const session = await UserVisit.startSession();

        try {
            await session.withTransaction(async () => {
                let aggregatedVisit = await UserVisit.findOne({ aggregated: true }).exec();
        
                if (!aggregatedVisit) {
                    aggregatedVisit = new UserVisit({
                        path: '/*',
                        count: 0,
                        locations: null,
                        aggregated: true
                    });
                }
            
                aggregatedVisit.date = new Date(Date.UTC(tillYear, tillMonth - 1));
            
                const visitsToAggregateFilter = {
                    $or:[
                        { aggregated: false },
                        { aggregated: { $exists: false } }
                    ],            
                    date: {
                        $lte: new Date(Date.UTC(tillYear, tillMonth))
                    }
                };
        
                for await (const userVisit of UserVisit.find(visitsToAggregateFilter).cursor()) {
                    aggregatedVisit.count += userVisit.count;
                }
            
                await UserVisit.deleteMany(visitsToAggregateFilter).exec();
        
                await aggregatedVisit.save();
            });
        }
        finally {
            session.endSession();
        }
    }
}


export {
    Options,
    UserVisitCounter
};
