import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { TasksComponent } from './tasks.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'tasks',
        canActivate: [ CanActivateViaAuthGuard ],
        component: TasksComponent
    }
];

@NgModule({
    declarations: [
        TasksComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule
    ],
    exports     : [
        TasksComponent
    ]
})

export class TasksModule
{
}
