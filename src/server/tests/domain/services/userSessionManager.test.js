import db from '../../db.js';
import { openSession, sessions } from '../../../domain/services/userSessionManager.js';

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.disconnect());


describe('Open new session', () => {
    const username = 'testUser';
    const password = 'testPassword';

    describe('without configured admin credentials ', () => {
        it('result should contain error message', async () => {
            delete process.env.ADMIN_USERNAME;
            delete process.env.ADMIN_PASSWORD;

            const expected = {
                'message': 'Admin username or password have not been set up',
                'token': undefined,
                'username': username
            };

            const actual = openSession(username, password);

            expect(actual).toMatchObject(expected);
        });

        it('result should contain error message', async () => {
            delete process.env.ADMIN_USERNAME;
            delete process.env.ADMIN_PASSWORD;

            const expected = {
                'message': 'Admin username or password have not been set up',
                'token': undefined,
                'username': username
            };

            const actual = openSession(username, password);

            expect(actual).toMatchObject(expected);
        });
    });

    describe('with wrong credentials', () => {    
        const wrongUsername = 'testUser1';
        const wrongPassword = 'testPassword1';

        describe('when the user name is incorrect', () => {
            it('result should contain error message', async () => {
                process.env.ADMIN_USERNAME = username;
                process.env.ADMIN_PASSWORD = password;

                const expected = {
                    'message': 'Invalid credentials',
                    'token': undefined,
                    'username': wrongUsername
                };

                const actual = openSession(wrongUsername, password);

                expect(actual).toMatchObject(expected);
            });
        });

        describe('when the password is incorrect', () => {
            it('result should contain error message', async () => {
                process.env.ADMIN_USERNAME = username;
                process.env.ADMIN_PASSWORD = password;

                const expected = {
                    'message': 'Invalid credentials',
                    'token': undefined,
                    'username': username
                };

                const actual = openSession(username, wrongPassword);

                expect(actual).toMatchObject(expected);
            });
        });
    });

    describe('with correct credentials', () => {
        it('should return token', () => {
            process.env.ADMIN_USERNAME = username;
            process.env.ADMIN_PASSWORD = password;

            const expected = {
                'message': undefined,
                'username': username
            };

            const actual = openSession(username, password);

            expect(actual).toEqual(expect.objectContaining(expected));
            expect(actual.token.length).not.toEqual(0);

            expect(sessions).toHaveProperty(username);

            const currentSessions = sessions[username];
            expect(currentSessions.length).toEqual(1);

            const currentSession = currentSessions[0];
            expect(currentSession.username).toEqual(username);
            expect(currentSession.token).toEqual(actual.token);
            expect(currentSession.updatedOn).not.toBeNull();
        });
    });
});
