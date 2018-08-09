import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/app-config/actions';
import { AppState } from '../../store/app-config/reducer';


@Injectable()
export class AppDispatchers {
  constructor(private store: Store<AppState>) {}

  toggleDataSource(location: string) {
    this.store.dispatch(new AppActions.ToggleDataSource(location));
  }
}
