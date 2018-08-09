export * from '../../store/app-config/dispatchers';
export * from '../../store/app-config/reducer';
export * from '../../store/app-config/selectors';

import { AppDispatchers } from '../../store/app-config/dispatchers';
import { AppSelectors } from '../../store/app-config/selectors';

export const appConfigServices = [AppDispatchers, AppSelectors];
