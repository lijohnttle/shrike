import { UserSession } from '../../../../domain/entities/authentication/UserSession';
import { UserSessionStorage, EventNames } from '../../../../domain/entities/authentication/UserSessionStorage';
import { UserSessionStorageTokenCollissionError } from '../../../../domain/entities/authentication/UserSessionStorageTokenCollissionError';

describe('Store session', () => {
    describe('when there are no other sessions', () => {
        it('then should persist session', () => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');

            sessionStorage.store(session);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(1);
            expect(sessionStorage._sessionByToken[session.token]).toBe(session);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session.username][0]).toBe(session);
        });
    });

    describe('when there is a session of another user', () => {
        it('then should keep both sessions', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user1', 'user_token1');
            const session2 = new UserSession('user2', 'user_token2');

            sessionStorage.store(session1);
            sessionStorage.store(session2);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(2);
            expect(sessionStorage._sessionByToken[session1.token]).toBe(session1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(2);
            expect(sessionStorage._sessionsByUsername[session1.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session1.username][0]).toBe(session1);
            expect(sessionStorage._sessionsByUsername[session2.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username][0]).toBe(session2);
        });
    });

    describe('when there is a session of another user with the same token', () => {
        it('then should throw an exception', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user1', 'user_token');
            const session2 = new UserSession('user2', 'user_token');

            sessionStorage.store(session1);

            expect(() => sessionStorage.store(session2)).toThrow(UserSessionStorageTokenCollissionError);
        });
    });

    describe('when there is a session of the same user with the same token', () => {
        it('then should override existing session', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user', 'user_token');
            const session2 = new UserSession('user', 'user_token');

            sessionStorage.store(session1);
            sessionStorage.store(session2);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username][0]).toBe(session2);
        });
    });

    describe('when there is a session of the same user', () => {
        it('then should keep both sessions', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');

            sessionStorage.store(session1);
            sessionStorage.store(session2);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(2);
            expect(sessionStorage._sessionByToken[session1.token]).toBe(session1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session1.username].length).toBe(2);
            expect(sessionStorage._sessionsByUsername[session1.username][0]).toBe(session1);
            expect(sessionStorage._sessionsByUsername[session1.username][1]).toBe(session2);
        });
    });
});

describe('Find session', () => {
    describe('when session exists', () => {
        it('then session should be found by token', () => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');
            sessionStorage.store(session);

            const foundSession = sessionStorage.findByToken(session.token);

            expect(foundSession).toBe(session);
            expect(foundSession.isExpired).toBe(false);
        });

        it('then all sessions should be found by username', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            const foundSessions = sessionStorage.findByUsername(session1.username);

            expect(foundSessions).toBeTruthy();
            expect(foundSessions.length).toBe(2);
            expect(foundSessions[0]).toBe(session1);
            expect(foundSessions[1]).toBe(session2);

            for (const session of foundSessions) {
                expect(session.isExpired).toBe(false);
            }
        });

        it('then expired session found by token should has flag isExpired set to true', () => {
            const sessionStorage = new UserSessionStorage(10 * 60 * 1000);
            const session = new UserSession('user', 'user_token');
            sessionStorage.store(session);

            const oldDate = new Date(new Date() - 20 * 60 * 1000);

            session.updatedOn = oldDate;

            const foundSession = sessionStorage.findByToken(session.token);

            expect(foundSession).toBe(session);
            expect(foundSession.isExpired).toBe(true);
        });

        it('then all expired sessions found by username should has flag isExpired set to true', () => {
            const sessionStorage = new UserSessionStorage(10 * 60 * 1000);
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            const oldDate = new Date(new Date() - 20 * 60 * 1000);

            session1.updatedOn = oldDate;
            session2.updatedOn = oldDate;

            const foundSessions = sessionStorage.findByUsername(session1.username);

            expect(foundSessions).toBeTruthy();
            expect(foundSessions.length).toBe(2);
            expect(foundSessions[0]).toBe(session1);
            expect(foundSessions[1]).toBe(session2);

            for (const session of foundSessions) {
                expect(session.isExpired).toBe(true);
            }
        });
    });

    describe('when session does not exist', () => {
        it('then session should not be found by token', () => {
            const sessionStorage = new UserSessionStorage();

            const foundSession = sessionStorage.findByToken('user_token');

            expect(foundSession).not.toBeTruthy(foundSession);
        });

        it('then all sessions should be found by username', () => {
            const sessionStorage = new UserSessionStorage();

            const foundSessions = sessionStorage.findByUsername('user');

            expect(foundSessions.length).toBe(0);
        });
    });
});

describe('Clear sessions', () => {
    describe('when there are sessions', () => {
        it('then should delete all sessions', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            sessionStorage.clear();

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(0);
            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(0);
        });
    });
});

describe('Delete session', () => {
    describe('when there is no session with specific token', () => {
        it('then nothing should happen', () => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');
            sessionStorage.store(session);

            sessionStorage.delete('another_user_token');

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(1);
            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
        });
    });

    describe('when there is a session', () => {
        it('then should delete the session', () => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');
            sessionStorage.store(session);

            sessionStorage.delete(session.token);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(0);
            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(0);
        });

        it('then should delete the session and keep sessions of other users', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user1', 'user_token1');
            const session2 = new UserSession('user2', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            sessionStorage.delete(session1.token);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username][0]).toBe(session2);
        });

        it('then should delete the session and keep other sessions of the same user', () => {
            const sessionStorage = new UserSessionStorage();
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            sessionStorage.delete(session1.token);

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session2.username][0]).toBe(session2);
        });
    });
});

describe('Delete expired sessions', () => {
    describe('when there are no expired sessions', () => {
        it('then nothing should happen', () => {
            const sessionStorage = new UserSessionStorage(10 * 60 * 1000);
            const session1 = new UserSession('user', 'user_token1');
            const session2 = new UserSession('user', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            sessionStorage.deleteExpired();

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(2);
            expect(sessionStorage._sessionByToken[session1.token]).toBe(session1);
            expect(sessionStorage._sessionByToken[session2.token]).toBe(session2);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session1.username].length).toBe(2);
            expect(sessionStorage._sessionsByUsername[session1.username][0]).toBe(session1);
            expect(sessionStorage._sessionsByUsername[session1.username][1]).toBe(session2);
        });
    });

    describe('when all sessions are expired', () => {
        it('then should delete expired sessions', () => {
            const sessionStorage = new UserSessionStorage(10 * 60 * 1000);
            const session1 = new UserSession('user1', 'user_token1');
            const session2 = new UserSession('user2', 'user_token2');
            sessionStorage.store(session1);
            sessionStorage.store(session2);

            const oldDate = new Date(new Date() - 20 * 60 * 1000);

            session1.updatedOn = oldDate;
            session2.updatedOn = oldDate;

            sessionStorage.deleteExpired();

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(0);
            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(0);
        });
    });

    describe('when there are expired sessions', () => {
        it('then should delete expired sessions and keep not expired', () => {
            const sessionStorage = new UserSessionStorage(10 * 60 * 1000);
            const session1 = new UserSession('user1', 'user_token1');
            const session2 = new UserSession('user1', 'user_token2');
            const session3 = new UserSession('user2', 'user_token3');
            const session4 = new UserSession('user2', 'user_token4');
            sessionStorage.store(session1);
            sessionStorage.store(session2);
            sessionStorage.store(session3);
            sessionStorage.store(session4);

            const oldDate = new Date(new Date() - 20 * 60000);

            session2.updatedOn = oldDate;
            session4.updatedOn = oldDate;

            sessionStorage.deleteExpired();

            expect(Object.keys(sessionStorage._sessionByToken).length).toBe(2);
            expect(sessionStorage._sessionByToken[session1.token]).toBe(session1);
            expect(sessionStorage._sessionByToken[session3.token]).toBe(session3);

            expect(Object.keys(sessionStorage._sessionsByUsername).length).toBe(2);
            expect(sessionStorage._sessionsByUsername[session1.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session1.username][0]).toBe(session1);
            expect(sessionStorage._sessionsByUsername[session3.username].length).toBe(1);
            expect(sessionStorage._sessionsByUsername[session3.username][0]).toBe(session3);
        });
    });
});

describe('Check there are sessions', () => {
    describe('when there are no sessions', () => {
        it('should return false', () => {
            const sessionStorage = new UserSessionStorage();

            expect(sessionStorage.hasSessions()).toBe(false);
        });
    });

    describe('when there are sessions', () => {
        it('should return true', () => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');
            sessionStorage.store(session);

            expect(sessionStorage.hasSessions()).toBe(true);
        });
    });
});

describe('Add event listener', () => {
    describe('when session added', () => {
        it('then event handler should be called', (done) => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');

            for (const eventName in EventNames) {
                if (eventName !== EventNames.SESSION_ADDED) {
                    sessionStorage.addListener(eventName, () => {
                        fail('Wrong event listener called');
                    });
                }
            }

            sessionStorage.addListener(EventNames.SESSION_ADDED, () => {
                done();
            });
            
            sessionStorage.store(session);
        });
    });

    describe('when session deleted', () => {
        it('then event handler should be called', (done) => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');

            sessionStorage.store(session);

            for (const eventName in EventNames) {
                if (eventName !== EventNames.SESSION_DELETED) {
                    sessionStorage.addListener(eventName, () => {
                        fail('Wrong event listener called');
                    });
                }
            }

            sessionStorage.addListener(EventNames.SESSION_DELETED, () => {
                done();
            });

            sessionStorage.delete(session.token);
        });
    });
});

describe('Remove event listener', () => {
    describe('when session added', () => {
        it('then event handler should not be called', (done) => {
            const sessionStorage = new UserSessionStorage();
            const session = new UserSession('user', 'user_token');

            const handler = () => {
                fail('Event listener has been called');
            };

            sessionStorage.addListener(EventNames.SESSION_ADDED, handler);
            sessionStorage.removeListener(EventNames.SESSION_ADDED, handler);
            
            sessionStorage.store(session);

            done();
        }, 3000);
    });
});
