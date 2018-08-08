import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  // AllUsersLoaded,
  // AllUsersRequested,
  UserActionTypes,
  LoadAction, LoadSucceedAction
  // UserLoaded,
  // UserRequested
  // , LessonsPageCancelled, LessonsPageLoaded, LessonsPageRequested
} from '@app/store/user/user.actions';
import { throwError, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom, tap } from "rxjs/operators";
// import { UsersService } from './services/users.service';
import { AppState } from '@app/store';
import { select, Store } from '@ngrx/store';
import { allUsersLoaded, selectAllUsers } from '@app/store/user/user.selectors';
import { BackendService } from "@app/backend.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: BackendService,//private usersService: UsersService,
    private store: Store<AppState>) {
  }

  // @Effect()
  // loadUser$ = this.actions$
  //   .pipe(
  //   ofType<LoadAction>(UserActionTypes.Load),
  //   mergeMap(action => this.usersService.user(action.payload.userId)),
  //   map(user => new Lo({ user }))

  //   );
  @Effect()
  loadAllUsers$ = this.actions$
    .pipe(
    ofType<LoadAction>(UserActionTypes.Load),
    withLatestFrom(this.store.pipe(select(selectAllUsers))),
    //filter(([action, allTicketsLoaded]) => !allTicketsLoaded),
    mergeMap(() => this.usersService.users()),
    map(users => new LoadSucceedAction(users))
    );

  // @Effect()
  // loadAllUser2$ = this.actions$
  //   .pipe(
  //   ofType<LoadAction>(UserActionTypes.Load),
  //   mergeMap(action =>
  //     this.usersService.users().pipe(
  //       map(users =>
  //         this.store.dispatch(new LoadSucceedAction(users)))
  //       // map(users =>
  //       //   this.store.dispatch(new LoadSucceedAction(users))),
  //       // catchError(err => of(new productActions.LoadFail(err)))
  //     )
  //   )
  // );


  // @Effect()
  // loadLessonsPage$ = this.actions$
  //   .pipe(
  //   ofType<LessonsPageRequested>(UserActionTypes.LessonsPageRequested),
  //   mergeMap(({ payload }) =>
  //     this.usersService.findLessons(payload.userId,
  //       payload.page.pageIndex, payload.page.pageSize)
  //       .pipe(
  //       catchError(err => {
  //         console.log('error loading a lessons page ', err);
  //         this.store.dispatch(new LessonsPageCancelled());
  //         return of([]);
  //       })
  //       )

  //   ),
  //   map(lessons => new LessonsPageLoaded({ lessons }))
  //   );


}









