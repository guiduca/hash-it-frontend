import { NgModule } from '@angular/core';

import { ConsultantsModule } from './consultants/consultants.module';
import { ProjectsModule } from './projects/projects.module';
import { StaffingModule } from './staffing/staffing.module';
import { TasksModule } from './tasks/tasks.module';
import { WIPModule } from './wip/wip.module';
import { TodoModule } from './todo/todo.module';
import { ContactsModule } from './contacts/contacts.module';
import { ScrumboardModule } from './scrumboard/scrumboard.module';

@NgModule({
    imports: [
        ConsultantsModule,
        ProjectsModule,
        StaffingModule,
        TasksModule,
        WIPModule,
        TodoModule,
        ContactsModule,
        ScrumboardModule
    ]
})
export class FeaturesModule
{

}
