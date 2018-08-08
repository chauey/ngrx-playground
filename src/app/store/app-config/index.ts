export * from '@app/store/app-config/dispatchers';
export * from '@app/store/app-config/reducer';
export * from '@app/store/app-config/selectors';

import { AppDispatchers } from '@app/store/app-config/dispatchers';
import { AppSelectors } from '@app/store/app-config/selectors';

export const appConfigServices = [AppDispatchers, AppSelectors];
