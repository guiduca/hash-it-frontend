import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from './fuse-config';

import { CanActivateViaAuthGuard } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { Error404Module } from './main/404/error-404.module';
import { LoginModule } from './main/login/login.module';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { NetworksModule } from './main/networks/networks.module';
import { ContractsModule } from './main/contracts/contracts.module';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { FakeDbService } from 'app/fake-db/fake-db.service';

import { JwtInterceptor } from './services/jwt.interceptor';

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('553412812946-q003fq60itu2t2r25v3okr0if9g05tmu.apps.googleusercontent.com')
    }
]);

export function provideConfig() {
    return config;
}


const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: '404' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        SocialLoginModule,

        //Fake DB
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // App modules
        LayoutModule,
        Error404Module,
        LoginModule,
        DashboardModule,
        NetworksModule,
        ContractsModule
    ],
    providers: [
        [CanActivateViaAuthGuard],
        { provide: AuthServiceConfig, useFactory: provideConfig},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
