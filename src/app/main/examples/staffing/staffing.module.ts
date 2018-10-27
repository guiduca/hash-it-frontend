import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { StaffingComponent } from './staffing.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'staffing',
        canActivate: [ CanActivateViaAuthGuard ],
        component: StaffingComponent
    }
];

@NgModule({
    declarations: [
        StaffingComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule
    ],
    exports     : [
        StaffingComponent
    ]
})

export class StaffingModule
{
}
