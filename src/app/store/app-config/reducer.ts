import * as AppActions from '@app/store/app-config/actions';
import { ActionReducerMap } from '@ngrx/store';


export interface SessionState {
  dataSource: string;
}

export const initialState: SessionState = {
  dataSource: 'local'
};

export interface AppState {
  session: SessionState;
}

export const appConfigReducers: ActionReducerMap<AppState> = {
  session: sessionReducer
  // here is where i put other reducers, when i have them
};

export function sessionReducer(
  state = initialState,
  action: AppActions.All
): SessionState {
  switch (action.type) {
    case AppActions.TOGGLE_DATASOURCE: {
      return {
        ...state,
        dataSource: action.payload
      };
    }
  }
  return state;
}
