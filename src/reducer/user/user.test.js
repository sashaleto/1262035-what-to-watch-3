import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {Operation} from "../user/user";
import {createAPI} from "../../api";
import {userDataAdapter} from "./user";

const api = createAPI(() => {});
const authInfoResponse = {
  "id": 1,
  "email": `Oliver.conner@gmail.com`,
  "name": `Oliver.conner`,
  "avatar_url": `img/1.png`
};
const fakeAuthRequest = {
  email: `Oliver.conner@gmail.com`,
  password: ``,
};
const fakeSignInError = `child "email" fails because ["email" must be a valid email]`;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authInfo: null,
    signInError: ``,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for save user info returns correct action`, () => {
    expect(ActionCreator.saveUserInfo({})).toEqual({
      type: ActionType.SAVE_USER_INFO,
      payload: {},
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make an incorrect API call to check auth by /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(401, []);

    return checkAuth(dispatch, () => {}, api)
      .catch(() => {})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
      });
  });

  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, authInfoResponse);

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SAVE_USER_INFO,
          payload: userDataAdapter(authInfoResponse),
        });
      });
  });

  it(`Should make an incorrect API call to sign in by /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(fakeAuthRequest);

    apiMock
      .onPost(`/login`)
      .reply(400, {error: fakeSignInError});

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_LOGIN_ERROR,
          payload: fakeSignInError,
        });
      });
  });

  it(`Should make a correct API call to to sign in by /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(fakeAuthRequest);

    apiMock
      .onPost(`/login`)
      .reply(200, authInfoResponse);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SAVE_USER_INFO,
          payload: userDataAdapter(authInfoResponse),
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_LOGIN_ERROR,
          payload: null,
        });
      });
  });
});
