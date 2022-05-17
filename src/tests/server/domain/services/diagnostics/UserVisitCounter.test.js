import { UserVisitCounter } from '../../../../../server/domain/services/diagnostics/UserVisitCounter.js';
import { UserVisit } from '../../../../../server/data/models/diagnostics/UserVisit.js';


beforeAll(async () => await connectDb());
afterEach(async () => await clearDb());
afterAll(async () => await disconnectDb());


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

    describe('when user visits a page without providing location', () => {
        it('then visit should be persisted without location information', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = {
                path: '/',
                count: 1,
                locations: null,
            };
            
            await userVisitCounter.recordVisit('/', '', '');

            const actual = await UserVisit.findOne().exec();

            expect(actual).toMatchObject(expected);
        });
    });
});

describe('Aggregate visits', () => {
    describe('when all visits are being aggregated', () => {
        it('then only one aggregated visit stays in the database', async () => {
            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });
            const today = new Date();
            const expected = [
                {
                    path: '/*',
                    count: 2,
                    locations: null,
                    aggregated: true,
                    date: new Date(Date.UTC(today.getFullYear(), today.getMonth()))
                },
            ];

            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/about', 'country2', 'city2');
            await userVisitCounter.aggregate(today.getFullYear(), today.getMonth() + 1);
    
            const actual = await UserVisit.find().exec();
    
            expect(actual).toMatchObject(expected);
        });
    });

    describe('when visits for previous month are being aggregated', () => {
        it('then one aggregated visit and all visits for current month stays in the database', async () => {
            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });
            const today = new Date();
            const previousMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, 1));
            const expected = [
                {
                    path: '/*',
                    count: 2,
                    locations: null,
                    aggregated: true,
                    date: new Date(Date.UTC(previousMonth.getFullYear(), previousMonth.getMonth()))
                },
                {
                    path: '/',
                    count: 1,
                    locations: [
                        {
                            country: 'country1',
                            city: 'city1'
                        }
                    ],
                    date: today
                },
            ];
            

            await userVisitCounter.recordVisit('/', 'country1', 'city1', previousMonth);
            await userVisitCounter.recordVisit('/about', 'country2', 'city2', previousMonth);
            await userVisitCounter.recordVisit('/', 'country1', 'city1', today);
            await userVisitCounter.aggregate(today.getFullYear(), today.getMonth());
    
            const actual = await UserVisit.find().exec();
            actual.sort((first, second) => (second.aggregated ? 1 : 0) - (first.aggregated ? 1 : 0));
    
            expect(actual).toMatchObject(expected);
        });
    });
});

describe('Get records', () => {
    describe('when there are multiple uesr visits', () => {
        it('then multiple user visits are returned', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = [
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
            await userVisitCounter.recordVisit('/about', 'country1', 'city1');

            const actual = await userVisitCounter.getVisits(2);

            expect(actual).toMatchObject(expected);
        });

        it('then N last uesr visits are returned', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = [
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
            ];
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/about', 'country1', 'city1');

            const actual = await userVisitCounter.getVisits(1);

            expect(actual).toMatchObject(expected);
        });
    });
});

describe('Delete visits', () => {
    describe('when user clears visits', () => {
        it('then there are no visits in the database', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/', 'country2', 'city2');
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            await userVisitCounter.recordVisit('/', 'country2', 'city2');

            await userVisitCounter.clearAll();

            const actual = await UserVisit.find().exec();

            expect(actual.length).toBe(0);
        });
    });

    describe('when user deletes a visit', () => {
        it('then visit should be deleted from the database', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');
            const visit = await UserVisit.findOne().exec();

            await userVisitCounter.delete(visit._id);

            const actual = await UserVisit.find().exec();

            expect(actual.length).toBe(0);
        });
    });
});
