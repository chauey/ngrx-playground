import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BackendService } from '@app/backend.service';
import { CoreModule } from '@app/core/core.module';
import { AppStoreModule } from '@app/store/app-store.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    AppStoreModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
