import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';

import { shareReplay, tap } from 'rxjs/operators';

import { AppSelectors } from '../store/app-config';
import { FilterObserver } from '../shared/filter';
import { User } from '../core';

@Injectable({ providedIn: 'root' })
export class UsersService extends EntityCollectionServiceBase<User> {
  filterObserver: FilterObserver;

  /** Run `getAll` if the datasource changes. */
  getAllOnDataSourceChange = this.appSelectors.dataSource$().pipe(tap(_ => this.getAll()), shareReplay(1));

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private appSelectors: AppSelectors) {
    super('User', serviceElementsFactory);

    /** User's filter pattern */
    this.filterObserver = {
      filter$: this.filter$,
      setFilter: this.setFilter.bind(this)
    };
  }
}
