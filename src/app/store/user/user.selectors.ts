import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../../store/user/user.reducers';
import { UsersState } from '../../store/user/user.reducers';


// import * as fromLesson from './lessons.reducers';

// import {PageQuery} from './user.actions';
// import {LessonsState} from './lessons.reducers';

export const selectUsersState = createFeatureSelector<UsersState>("users");

// export const selectLessonsState = createFeatureSelector<LessonsState>("lessons");


export const selectUserById = (userId: number) => createSelector(
  selectUsersState,
  usersState => usersState.entities[userId]
);

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUser.selectAll
);

export const allUsersLoaded = createSelector(
  selectUsersState,
  usersState => usersState.allUsersLoaded
);
