import db from '../../../../db.js';
import { UserVisitCounter } from '../../../../../server/domain/services/diagnostics/UserVisitCounter.js';
import { UserVisit } from '../../../../../server/data/models/diagnostics/UserVisit.js';


beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.disconnect());


describe('Record a visit', () => {
    describe('when user visits a root page', () => {
        it('then visit should be persisted in the database', async () => {

            const userVisitCounter = new UserVisitCounter({
                dayVisitCountLimit: 5
            });

            const expected = {
                path: '/',
                locations: [
                    {
                        country: 'country1',
                        city: 'city1'
                    }
                ],
            };
            
            await userVisitCounter.recordVisit('/', 'country1', 'city1');

            const actual = await UserVisit.findOne({}).exec();

            expect(actual).toMatchObject(expected);
        });
    });
});
