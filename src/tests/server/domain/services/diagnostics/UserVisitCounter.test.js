import db from '../../../../db.js';
import { UserVisitCounter } from '../../../../../server/domain/services/diagnostics/UserVisitCounter.js';
import { UserVisit } from '../../../../../server/data/models/diagnostics/UserVisit.js';


beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.disconnect());


describe('Record visits', () => {
    describe('when user visits a single page', () => {
        it('then visit should be persisted', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = {
                path: '/',
                count: 1,
                locations: [
                    {
                        country: 'country1',
                        city: 'city1'
                    }
                ],
            };
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');

            const actual = await UserVisit.findOne().exec();

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when user visits multiple pages', () => {
        it('then visits should be persisted', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = [
                {
                    path: '/',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                },
                {
                    path: '/about',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                }
            ];
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/about', 'country1', 'city1');

            const actual = await UserVisit.find().exec();

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when multiple users visit multiple pages', () => {
        it('then visits should be persisted', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = [
                {
                    path: '/',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                },
                {
                    path: '/about',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                },
                {
                    path: '/projects',
                    count: 1,
                    locations: [
                        {
                            country: 'country2',
                            city: 'city2'
                        }
                    ],
                }
            ];
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/about', 'country1', 'city1');
            await userVisitCounter.recordVisit('/projects', 'country2', 'city2');

            const actual = await UserVisit.find().exec();

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when day count limit is exceeded', () => {
        it('then further visits should not be persisted', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 1
            });

            const expected = [
                {
                    path: '/',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                },
            ];
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/', 'country1', 'city1');

            const actual = await UserVisit.find().exec();

            expect(actual).toMatchObject(expected);
        });
    });
});

describe('Aggregate visits', () => {
    describe('when all visits are being aggregated', () => {
        it('then only one visit stays in the database', async () => {
            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });
    
            const expected = [
                {
                    path: '/*',
                    count: 2,
                    locations: null,
                    aggregated: true,
                },
            ];
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/about', 'country2', 'city2');
    
            const today = new Date();
    
            await userVisitCounter.aggregate(today.getFullYear(), today.getMonth() + 1);
    
            const actual = await UserVisit.find().exec();
    
            expect(actual).toMatchObject(expected);
        });
    });
});
