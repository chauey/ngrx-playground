import { Injectable } from '@angular/core';
import * as AppActions from '@app/store/app-config/actions';
import { AppState } from '@app/store/app-config/reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class AppDispatchers {
  constructor(private store: Store<AppState>) {}

  toggleDataSource(location: string) {
    this.store.dispatch(new AppActions.ToggleDataSource(location));
  }
}
