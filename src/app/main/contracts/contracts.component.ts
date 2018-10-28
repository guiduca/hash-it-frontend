import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { ContractsService } from './contracts.service';
import { ContractsContractFormDialogComponent } from './contract-form/contract-form.component';

@Component({
    selector     : 'contracts',
    templateUrl  : './contracts.component.html',
    styleUrls    : ['./contracts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ContractsComponent implements OnInit, OnDestroy
{
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContractsService} _contractsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _contractsService: ContractsService,
        private _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contract
     */
    newContract(): void
    {
        this.dialogRef = this._matDialog.open(ContractsContractFormDialogComponent, {
            panelClass: 'contract-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._contractsService.updateContract(response.getRawValue());
            });
    }
}
