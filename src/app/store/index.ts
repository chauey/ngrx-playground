import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import {User} from '@app/model/user.model';
import {AuthActions, AuthActionTypes} from '@app/auth/auth.actions';
import {storeFreeze} from 'ngrx-store-freeze';
import {routerReducer} from '@ngrx/router-store';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};





export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze] : [];
