import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NetworksComponent } from './networks.component';
import { NetworksService } from './networks.service';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CanActivateViaAuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
    {
        path     : 'networks',
        component: NetworksComponent,
        canActivate: [ CanActivateViaAuthGuard ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule
  ],
  declarations: [
    NetworksComponent
  ],
  providers   : [
    NetworksService
  ]
})

export class NetworksModule { }
