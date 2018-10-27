import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ConsultantsComponent } from './consultants.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'consultants11',
        canActivate: [ CanActivateViaAuthGuard ],
        component: ConsultantsComponent
    }
];

@NgModule({
    declarations: [
        ConsultantsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule
    ],
    exports     : [
        ConsultantsComponent
    ]
})

export class ConsultantsModule
{
}
