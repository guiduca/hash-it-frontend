import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { NetworksComponent } from './networks.component';
import { NetworksService } from './networks.service';
import { NetworksNetworkListComponent } from './network-list/network-list.component';
import { NetworksNetworkFormDialogComponent } from './network-form/network-form.component';

import { CanActivateViaAuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
    {
        path     : 'networks',
        component: NetworksComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            networks: NetworksService
        }
    }
];

@NgModule({
    declarations   : [
        NetworksComponent,
        NetworksNetworkListComponent,
        NetworksNetworkFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
      NetworksService
    ],
    entryComponents: [
      NetworksNetworkFormDialogComponent
    ]
})
export class NetworksModule
{
}
