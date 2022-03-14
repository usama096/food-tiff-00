import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionTypes {
  GET_USERS = '[GET USERS]',
  GET_USERS_SUCCESS = '[GET USERS] SUCCESS',
  GET_USERS_FAILURE = '[GET USERS] FAILURE',

  GET_USER_BY_ID = '[GET USER BY ID]',
  GET_USER_BY_ID_SUCCESS = '[GET USER BY ID] SUCCESS',
  GET_USER_BY_ID_FAILURE = '[GET USER BY ID] SUCCESS',

  UPDATE_USER = '[UPDATE USER]',
  UPDATE_USER_SUCCESS = '[UPDATE USER] SUCCESS',
  UPDATE_USER_FAILURE = '[UPDATE USER] FAILURE',

  DELETE_USER = '[DELETE PLAN]',
  DELETE_USER_SUCCESS = '[DELETE USER] SUCCESS',
  DELETE_USER_FAILURE = '[DELETE USER] FAILURE',

  ADD_USER = '[ADD USER]',
  ADD_USER_SUCCESS = '[ADD USER] SUCCESS',
  ADD_USER_FAILURE = '[ADD USER] FAILURE',
}

export const getUsers = createAction(UserActionTypes.GET_USERS);

export const getUsersSuccess = createAction(
  UserActionTypes.GET_USERS_SUCCESS,
  props<{ response: any }>()
);
export const getUsersFailure = createAction(
  UserActionTypes.GET_USERS_FAILURE,
  props<{ error: any }>()
);
export const getUsersById = createAction(
  UserActionTypes.GET_USER_BY_ID,
  props<{ id: number }>()
);

export const getUsersByIdSuccess = createAction(
  UserActionTypes.GET_USER_BY_ID_SUCCESS,
  props<{ response: any }>()
);

export const getUsersByIdFailure = createAction(
  UserActionTypes.GET_USER_BY_ID_FAILURE,
  props<{ error: any }>()
);

export const updateUser = createAction(
  UserActionTypes.UPDATE_USER,
  props<{ user: User, id: number}>()
);
export const updateUserSuccess = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS,
  props<{ response: User }>()
);
export const updateUserFailure = createAction(
  UserActionTypes.UPDATE_USER_FAILURE,
  props<{ error: any }>()
);
export const deleteUser = createAction(
  UserActionTypes.DELETE_USER,
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  UserActionTypes.DELETE_USER_SUCCESS,
  props<{ response: any }>()
);
export const deleteUserFailure = createAction(
  UserActionTypes.DELETE_USER_FAILURE,
  props<{ error: any }>()
);
export const addUser = createAction(
  UserActionTypes.ADD_USER,
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  UserActionTypes.ADD_USER_SUCCESS,
  props<{ response: any }>()
);
export const addUserFailure = createAction(
  UserActionTypes.ADD_USER_FAILURE,
  props<{ error: any }>()
);
