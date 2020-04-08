import {extend} from "../../utils.js";
import history from "../../history";
import {AppRoutes} from "../../constants";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
  signInError: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SAVE_USER_INFO: `SAVE_USER_INFO`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  saveUserInfo: (userData) => {
    return {
      type: ActionType.SAVE_USER_INFO,
      payload: userData,
    };
  },

  setLoginError: (message) => ({
    type: ActionType.SET_LOGIN_ERROR,
    payload: message,
  }),
};

export const userDataAdapter = (data) => {
  return {
    id: data[`id`],
    email: data[`email`],
    name: data[`name`],
    avatarUrl: `https://htmlacademy-react-3.appspot.com/${data[`avatar_url`]}`,
  };
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.saveUserInfo(userDataAdapter(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.saveUserInfo(userDataAdapter(response.data)));
        dispatch(ActionCreator.setLoginError(null));
        history.push(AppRoutes.ROOT);
      }).catch((err) => {
        dispatch(ActionCreator.setLoginError(err.response.data.error));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SAVE_USER_INFO:
      return extend(state, {
        authInfo: action.payload,
      });

    case ActionType.SET_LOGIN_ERROR:
      return extend(state, {
        signInError: action.payload,
      });
  }

  return state;
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
