import { UserVisit } from '../../../data/models/diagnostics/UserVisit.js';


const DEFAULT_DAY_VISIT_COUNT_LIMIT = 100;


class Options {
    constructor() {
        this.dayVisitCountLimit = null;
    }
}

class UserVisitCounter {
    /**
     * @param {Options} options 
     */
    constructor(options) {
        this.dayVisitCountLimit = options.dayVisitCountLimit ?? DEFAULT_DAY_VISIT_COUNT_LIMIT;
    }

    /**
     * Saves a user's visit.
     * @param {String} path 
     * @param {String} country 
     * @param {String} city 
     */
    async recordVisit(path, country, city) {

        const today = new Date();
        const todayVisitCount = await UserVisit.count({
            date: {
                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
        }).exec();

        if (todayVisitCount < this.dayVisitCountLimit) {
            const userVisit = new UserVisit({
                path: path,
                locations: [
                    { country, city }
                ]
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
        
        let aggregatedVisit = await UserVisit.findOne({ aggregated: true }).exec();
    
        if (!aggregatedVisit) {
            aggregatedVisit = new UserVisit({
                path: '',
                count: 0,
                locations: null,
                aggregated: true
            });
        }
    
        aggregatedVisit.date = new Date(tillYear, tillMonth - 1);
    
        const visitsToAggregateFilter = {
            aggregated: false,
            date: {
                $lt: new Date(tillYear, tillMonth)
            }
        };
    
        for await (const userVisit of UserVisit.find(visitsToAggregateFilter).cursor()) {
            aggregatedVisit.count += userVisit.count;
        }
    
        UserVisit.deleteMany(visitsToAggregateFilter);
    }
}


export {
    Options,
    UserVisitCounter
};
