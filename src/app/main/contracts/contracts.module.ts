import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ContractsComponent } from './contracts.component';
import { ContractsService } from './contracts.service';
import { ContractsContractListComponent } from './contract-list/contract-list.component';
import { ContractsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { ContractsMainSidebarComponent } from './sidebars/main/main.component';
import { ContractsContractFormDialogComponent } from './contract-form/contract-form.component';

import { CanActivateViaAuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
    {
        path     : 'contracts',
        component: ContractsComponent,
        canActivate: [ CanActivateViaAuthGuard ],
        resolve  : {
            contacts: ContractsService
        }
    }
];

@NgModule({
    declarations   : [
        ContractsComponent,
        ContractsContractListComponent,
        ContractsSelectedBarComponent,
        ContractsMainSidebarComponent,
        ContractsContractFormDialogComponent
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
      ContractsService
    ],
    entryComponents: [
      ContractsContractFormDialogComponent
    ]
})
export class ContractsModule
{
}
