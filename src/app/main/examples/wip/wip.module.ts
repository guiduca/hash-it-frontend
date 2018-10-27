import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { WIPComponent } from './wip.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'wip11',
        canActivate: [ CanActivateViaAuthGuard ],
        component: WIPComponent
    }
];

@NgModule({
    declarations: [
        WIPComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule
    ],
    exports     : [
        WIPComponent
    ]
})

export class WIPModule
{
}
