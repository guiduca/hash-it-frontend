import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProjectsComponent } from './projects.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'projects',
        canActivate: [ CanActivateViaAuthGuard ],
        component: ProjectsComponent
    }
];

@NgModule({
    declarations: [
        ProjectsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule
    ],
    exports     : [
        ProjectsComponent
    ]
})

export class ProjectsModule
{
}
