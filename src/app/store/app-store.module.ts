import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { EntityStoreModule } from './entity/entity-store.module';
import { environment } from 'environments/environment';
import { CustomSerializer, routerReducers } from '../shared/utils';
import { appConfigReducers, appConfigServices } from '../store/app-config';


export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : []; // [storeFreeze]; since this test service keeps copy, this will not work

@NgModule({
  imports: [
    StoreModule.forRoot(routerReducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('appConfig', appConfigReducers),
    // EntityStoreModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [appConfigServices,
    { provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class AppStoreModule { }
