import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "../shared/utils";


export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

// export const reducers: ActionReducerMap<AppState> = {
//   router: routerReducer
// };





// export const metaReducers: MetaReducer<AppState>[] =
//   !environment.production ? [storeFreeze] : [];
