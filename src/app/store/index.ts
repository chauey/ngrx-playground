import { RouterStateUrl } from "@app/shared/utils";
import { RouterReducerState } from "@ngrx/router-store";


export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

// export const reducers: ActionReducerMap<AppState> = {
//   router: routerReducer
// };





// export const metaReducers: MetaReducer<AppState>[] =
//   !environment.production ? [storeFreeze] : [];
