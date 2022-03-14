import { createReducer, on } from '@ngrx/store';
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  getUsers,
  getUsersById,
  getUsersByIdFailure,
  getUsersByIdSuccess,
  getUsersFailure,
  getUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './user.action';
import { User } from './user.model';

export interface UserState {
  users: User[] | null;
  user: User | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
}
export const initialState: UserState = {
  users: null,
  id: null,
  errorMesage: null,
  response: null,
  user: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(getUsers, (state): UserState => {
    return {
      ...state,
    };
  }),
  on(getUsersSuccess, (state, action): UserState => {
    return {
      ...state,
      users: action.response,
    };
  }),
  on(getUsersFailure, (state, action): UserState => {
    return {
      ...state,
      errorMesage: action.error,
      users: null,
    };
  }),
  on(getUsersById, (state, action): UserState => {
    return {
      ...state,
      id: action.id,
    };
  }),
  on(getUsersByIdSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.response,
    };
  }),
  on(getUsersByIdFailure, (state, action): UserState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(updateUser, (state, action): UserState => {
    return {
      ...state,
    };
  }),

  on(updateUserSuccess, (state, action): UserState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(updateUserFailure, (state, action): UserState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(deleteUser, (state, action): UserState => {
    return {
      ...state,
      id: action.id,
    };
  }),

  on(deleteUserSuccess, (state, action): UserState => {
    return {
      ...state,
    };
  }),
  on(deleteUserFailure, (state, action): UserState => {
    return {
      ...state,
      response: action.error,
    };
  }),
  on(addUser, (state): UserState => {
    return {
      ...state,
    };
  }),

  on(addUserSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.response,
    };
  }),
  on(addUserFailure, (state, action): UserState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  })
);
