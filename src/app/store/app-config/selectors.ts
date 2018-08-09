import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppState, initialState } from '../../store/app-config/reducer';



const getAppState = createFeatureSelector<AppState>('appConfig');

// The following selector implementation guards against empty session state
// as happens when replay with redux dev tools
const getDataSource = createSelector(
  getAppState,
  (state: AppState) =>
    state ? state.session.dataSource : initialState.dataSource
);

@Injectable()
export class AppSelectors {
  constructor(private store: Store<AppState>) {}

  dataSource$() {
    return this.store.select(getDataSource).pipe(distinctUntilChanged());
  }
}
