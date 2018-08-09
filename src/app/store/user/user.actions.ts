import { Action } from '@ngrx/store';
import { User } from "../../core";
// import { User } from './model/user';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadSucceed = '[User] Succeed',
}

export class LoadAction implements Action {
  readonly type = UserActionTypes.Load;
  constructor() { }
}

export class LoadSucceedAction implements Action {
  readonly type = UserActionTypes.LoadSucceed;
  constructor(public payload: User[]) { }
}


export type UserActions =
  LoadAction | LoadSucceedAction;
