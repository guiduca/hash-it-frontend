import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule } from '@angular/material';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { TodoService } from './todo.service';
import { TodoComponent } from './todo.component';
import { TodoMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { TodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

import { CanActivateViaAuthGuard } from '../../../services/auth-guard.service';

const routes: Routes = [
    {
        path     : 'todo/all',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'todo/all/:todoId',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'todo/all/:tagHandle',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'todo/all/:tagHandle/:todoId',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'all/filter/:filterHandle',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'all/filter/:filterHandle/:todoId',
        component: TodoComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            todo: TodoService
        }
    }
];

@NgModule({
    declarations: [
        TodoComponent,
        TodoMainSidebarComponent,
        TodoListItemComponent,
        TodoListComponent,
        TodoDetailsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers   : [
        TodoService
    ]
})
export class TodoModule
{
}
