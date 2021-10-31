import { signIn, signOut, signOutEveryone, findSessions } from '../../../../domain/services/authentication/userAuthenticator.js';

const username = 'testUser';
const password = 'testPassword';

beforeEach(() => {
    process.env.ADMIN_USERNAME = username;
    process.env.ADMIN_PASSWORD = password;
});


describe('Sign in', () => {
    const wrongUsername = 'testUser1';
    const wrongPassword = 'testPassword1';

    describe('when there are no admin credentials configured ', () => {
        it('then result should contain error message', async () => {
            delete process.env.ADMIN_USERNAME;
            delete process.env.ADMIN_PASSWORD;

            const expected = {
                'message': 'Admin username or password have not been set up',
                'token': undefined,
                'username': username
            };

            const actual = signIn(username, password);

            expect(actual).toMatchObject(expected);
        });

        it('then result should contain error message', async () => {
            delete process.env.ADMIN_USERNAME;
            delete process.env.ADMIN_PASSWORD;

            const expected = {
                'message': 'Admin username or password have not been set up',
                'token': undefined,
                'username': username
            };

            const actual = signIn(username, password);

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when the username is incorrect', () => {
        it('result should contain error message', async () => {
            const expected = {
                'message': 'Invalid credentials',
                'token': undefined,
                'username': wrongUsername
            };

            const actual = signIn(wrongUsername, password);

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when the password is incorrect', () => {
        it('result should contain error message', async () => {
            const expected = {
                'message': 'Invalid credentials',
                'token': undefined,
                'username': username
            };

            const actual = signIn(username, wrongPassword);

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when credentials are correct', () => {
        it('should return token', () => {
            const expected = {
                'message': undefined,
                'username': username
            };

            const actual = signIn(username, password);
            const currentUserSessions = findSessions(username);

            expect(actual).toEqual(expect.objectContaining(expected));
            expect(actual.token.length).not.toEqual(0);

            expect(currentUserSessions).toBeTruthy();
            expect(currentUserSessions.length).toEqual(1);

            const currentUserSession = currentUserSessions[0];
            expect(currentUserSession.username).toEqual(username);
            expect(currentUserSession.token).toEqual(actual.token);
            expect(currentUserSession.updatedOn).not.toBeNull();
        });
    });
});

describe('Sign out', () => {
    describe('when token has been found', () => {
        it('then session should be removed', () => {
            const authenticationResult = signIn(username, password);

            expect(authenticationResult.token.length).not.toEqual(0);

            const signedOut = signOut(authenticationResult.token);

            expect(signedOut).toBe(true);
        });
    });

    describe('when token has not been found', () => {
        it('then nothing should happen', () => {
            const signedOut = signOut('user_token');

            expect(signedOut).toBe(false);
        });
    });
});

describe('Sign out everyone', () => {
    describe('when token has been found', () => {
        it('then session should be removed', () => {
            const authenticationResult = signIn(username, password);

            expect(authenticationResult.token.length).not.toEqual(0);

            signOutEveryone();

            const foundSessions = findSessions(username);

            expect(foundSessions.length).toBe(0);
        });
    });
});
