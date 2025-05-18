import { call, put, takeLatest } from 'redux-saga/effects';
import { authAPI } from './auth.api';
import {  type SignupPayload, type LoginPayload } from './auth.types';


export enum AuthActionTypes {
  SIGNUP = 'auth/signup',
  SIGNUP_SUCCESS = 'auth/signupSuccess',
  SIGNUP_FAILURE = 'auth/signupFailure',

  LOGIN = 'auth/login',
  LOGIN_SUCCESS = 'auth/loginSuccess',
  LOGIN_FAILURE = 'auth/loginFailure',

  LOGOUT = 'auth/logout',
  LOGOUT_SUCCESS = 'auth/logoutSuccess',
  LOGOUT_FAILURE = 'auth/logoutFailure',

  GET_ME = 'auth/getMe',
  GET_ME_SUCCESS = 'auth/getMeSuccess',
  GET_ME_FAILURE = 'auth/getMeFailure',

  REFRESH_TOKEN = 'auth/refreshToken',
  REFRESH_TOKEN_SUCCESS = 'auth/refreshTokenSuccess',
  REFRESH_TOKEN_FAILURE = 'auth/refreshTokenFailure',

  RESET_MUTATION = 'auth/resetMutation',
} 


function* signupWorker(action: { type: string; payload: SignupPayload }): Generator<any, void, any> {
  try {
    const response = yield call(authAPI.signup, action.payload);
    yield put({ type: AuthActionTypes.SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put({ type: AuthActionTypes.SIGNUP_FAILURE, payload: error.message });
    } else {
      yield put({ type: AuthActionTypes.SIGNUP_FAILURE, payload: 'An unknown error occurred' });
    }
  }
}

function* loginWorker(action: { type: string; payload: LoginPayload }): Generator<any, void, any> {
  try {
    const response = yield call(authAPI.login, action.payload);
    yield put({ type: AuthActionTypes.LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put({ type: AuthActionTypes.LOGIN_FAILURE, payload: error.message });
    } else {
      yield put({ type: AuthActionTypes.LOGIN_FAILURE, payload: 'An unknown error occurred' });
    }
  }
}

function* logoutWorker() {
  try {
    yield call(authAPI.logout);
    yield put({ type: AuthActionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put({ type: AuthActionTypes.LOGOUT_FAILURE, payload: error.message });
    } else {
      yield put({ type: AuthActionTypes.LOGOUT_FAILURE, payload: 'An unknown error occurred' });
    }
  }
}

function* getMeWorker(): Generator<any, void, any> {
  try {
    const response = yield call(authAPI.getMe);
    yield put({ type: AuthActionTypes.GET_ME_SUCCESS, payload: response.data });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put({ type: AuthActionTypes.GET_ME_FAILURE, payload: error.message });
    } else {
      yield put({ type: AuthActionTypes.GET_ME_FAILURE, payload: 'An unknown error occurred' });
    }
  }
}

function* refreshTokenWorker(): Generator<any, void, any> {
  try {
    const response = yield call(authAPI.refreshToken);
    yield put({ type: AuthActionTypes.REFRESH_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put({ type: AuthActionTypes.REFRESH_TOKEN_FAILURE, payload: error.message });
    } else {
      yield put({ type: AuthActionTypes.REFRESH_TOKEN_FAILURE, payload: 'An unknown error occurred' });
    }
  }
}

export function* watchAuth() {
  yield takeLatest(AuthActionTypes.SIGNUP, signupWorker);
  yield takeLatest(AuthActionTypes.LOGIN, loginWorker);
  yield takeLatest(AuthActionTypes.LOGOUT, logoutWorker);
  yield takeLatest(AuthActionTypes.GET_ME, getMeWorker);
  yield takeLatest(AuthActionTypes.REFRESH_TOKEN, refreshTokenWorker);
}


