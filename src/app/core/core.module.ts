import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdGeneratorService } from '@app/core/id-generator.service';
// import { ToastService } from './toast.service';
import { throwIfAlreadyLoaded } from '@app/core/module-import-check';
// import { IdGeneratorService } from './id-generator.service';
// import { ToggleDataSourceComponent } from './toggle-data-source.component';
import { ToolbarComponent } from '@app/core/toolbar/toolbar.component';
import { SharedModule } from '@app/shared/shared.module';
import { ToastService } from './toast.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // because we use <router-outlet> and routerLink
  ],
  declarations: [ToolbarComponent], // [ToggleDataSourceComponent],
  exports: [ToolbarComponent], // [ToggleDataSourceComponent],
  providers: [IdGeneratorService, ToastService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
