import auth from '@/store/auth';

describe('store/auth', () => {
  const mutations = auth.mutations;
  const actions = auth.actions;
  const getters = auth.getters;
  let state;
  beforeEach(() => {
    state = {
      currentUser: null,
    };
  });

  describe('mutations', () => {
    describe('setCurrentUser', () => {
      it('sets `currentUser` in the state', () => {
        const data = {uid: 'abc123', email: 'user@example.com'};
        mutations.setCurrentUser(state, data);
        expect(state.currentUser).toBe(data);
      });
    });
  });

  describe('actions', () => {
    let context;
    beforeEach(() => {
      context = {
        commit: jest.fn(),
        getters,
        state,
      };
    });

    describe('setCurrentUser', () => {
      describe('user is `null` (user is not logged in)', () => {
        it('runs `setCurrentUser` mutation with `null`', () => {
          actions.setCurrentUser(context, null);
          expect(context.commit).toHaveBeenCalledWith('setCurrentUser', null);
        });
      });
      describe('user object is supplied (user is logged in)', () => {
        it('runs `setCurrentUser` mutation with data from the user object', () => {
          const user = {
            uid: 'abc123',
            displayName: null,
            photoURL: null,
            email: 'user@example.com',
            emailVerified: true,
            phoneNumber: null,
            isAnonymous: false,
          };

          const expectedState = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: true,
          };

          actions.setCurrentUser(context, user);
          expect(context.commit).toHaveBeenCalledWith('setCurrentUser', expectedState);
        });
      });
    });
  });

  describe('getters', () => {
    describe('isLoggedIn', () => {
      describe('given a user is not logged in', () => {
        it('returns false', () => {
          expect(getters.isLoggedIn(state)).toBe(false);
        });
      });

      describe('given a user is logged in', () => {
        beforeEach(() => {
          state.currentUser = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: true,
          };
        });

        it('returns true', () => {
          expect(getters.isLoggedIn(state)).toBe(true);
        });
      });
    });

    describe('currentUserId', () => {
      describe('given a user is not logged in', () => {
        it('returns null', () => {
          expect(getters.currentUserId(state)).toBe(null);
        });
      });

      describe('given user with ID `abc123` is logged in', () => {
        beforeEach(() => {
          state.currentUser = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: true,
          };
        });

        it('returns `abc123`', () => {
          expect(getters.currentUserId(state)).toBe('abc123');
        });
      });
    });

    describe('isEmailVerified', () => {
      describe('given a user is not logged in', () => {
        it('returns null', () => {
          expect(getters.isEmailVerified(state)).toBe(false);
        });
      });

      describe('given a non-verified user is logged in', () => {
        beforeEach(() => {
          state.currentUser = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: false,
          };
        });

        it('returns false', () => {
          expect(getters.isEmailVerified(state)).toBe(false);
        });
      });

      describe('given a verified user is logged in', () => {
        beforeEach(() => {
          state.currentUser = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: true,
          };
        });

        it('returns true', () => {
          expect(getters.isEmailVerified(state)).toBe(true);
        });
      });
    });

    describe('currentUserEmail', () => {
      describe('given a user is not logged in', () => {
        it('returns null', () => {
          expect(getters.currentUserEmail(state)).toBe(null);
        });
      });

      describe('given user with email `user@example.com` is logged in', () => {
        beforeEach(() => {
          state.currentUser = {
            uid: 'abc123',
            email: 'user@example.com',
            emailVerified: true,
          };
        });

        it('returns `user@example.com`', () => {
          expect(getters.currentUserEmail(state)).toBe('user@example.com');
        });
      });
    });
  });
});
