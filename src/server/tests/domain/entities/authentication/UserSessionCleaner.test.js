import { UserSession } from '../../../../domain/entities/authentication/UserSession.js';
import { UserSessionCleaner } from '../../../../domain/entities/authentication/UserSessionCleaner.js';
import { UserSessionStorage, EventNames } from '../../../../domain/entities/authentication/UserSessionStorage.js';

describe('Clean up', () => {
    describe('when cleaner has been started', () => {
        const sessionStorage = new UserSessionStorage(10);
        const cleaner = new UserSessionCleaner(sessionStorage, 10);
    
        beforeEach(() => cleaner.start());
        afterEach(() => {
            cleaner.stop();
            sessionStorage.clear();
            sessionStorage.clearListeners();
        });

        it('then should delete expired sessions', (done) => {
            const session = new UserSession('user', 'user_token');
    
            sessionStorage.addListener(EventNames.SESSION_DELETED, () => {
                expect(sessionStorage.hasSessions()).toBe(false);
                done();
            });
    
            sessionStorage.store(session);
        });
    });
});