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
    async recordVisit(path, country, city, date) {

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
                ],
                date: date
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
    }
}


export {
    Options,
    UserVisitCounter
};
