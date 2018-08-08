import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { AuthEffects } from '@app/auth/auth.effects';
import { AuthGuard } from '@app/auth/auth.guard';
import * as fromAuth from '@app/auth/auth.reducer';
import { AuthService } from "@app/auth/auth.service";
import { LoginComponent } from '@app/auth/login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        StoreModule.forFeature('auth', fromAuth.authReducer),
        EffectsModule.forFeature([AuthEffects]),

    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        }
    }
}
