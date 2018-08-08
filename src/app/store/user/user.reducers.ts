import { User } from "@app/core";
import { UserActions, UserActionTypes } from "@app/store/user/user.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  allUsersLoaded: boolean;
}

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const userAdapter: EntityAdapter<User> =
  createEntityAdapter<User>({
    sortComparer: sortByName
  });

const initialUsersState = userAdapter.getInitialState({
  loading: false,
  allUsersLoaded: false
});

export function usersReducer(state = initialUsersState,
  action: UserActions): UsersState {

  switch (action.type) {
    case UserActionTypes.Load:
      return {
        ...state,
        loading: true
      };
    case UserActionTypes.LoadSucceed:
      return userAdapter.addMany(action.payload, { ...state, loading: false });
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = userAdapter.getSelectors();
