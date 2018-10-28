import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ContractsService } from '../contracts.service';
import { ContractsContractFormDialogComponent } from '../contract-form/contract-form.component';

@Component({
    selector     : 'contracts-contract-list',
    templateUrl  : './contract-list.component.html',
    styleUrls    : ['./contract-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ContractsContractListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    contracts: any;
    contract: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'name', 'no_nodes', 'no_authorities', 'created_by'];
    selectedContracts: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

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
        public _matDialog: MatDialog
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
        this.dataSource = new FilesDataSource(this._contractsService);

        this._contractsService.onContractsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contracts => {
                this.contracts = contracts;

                this.checkboxes = {};
                contracts.map(contract => {
                    this.checkboxes[contract.id] = false;
                });
            });

        this._contractsService.onSelectedContractsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContracts => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedContracts.includes(id);
                }
                this.selectedContracts = selectedContracts;
            });

        this._contractsService.onContractDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contract => {
                this.contract = contract;
            });

        this._contractsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._contractsService.deselectContracts();
            });
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
     * Edit contract
     *
     * @param contract
     */
    editContract(contract): void
    {
        this.dialogRef = this._matDialog.open(ContractsContractFormDialogComponent, {
            panelClass: 'contract-form-dialog',
            data      : {
                contract: contract,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._contractsService.updateContract(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContract(contract);

                        break;
                }
            });
    }

    /**
     * Delete Contract
     */
    deleteContract(contract): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._contractsService.deleteContract(contract);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param contractId
     */
    onSelectedChange(contractId): void
    {
        this._contractsService.toggleSelectedContract(contractId);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ContractsService} _contractsService
     */
    constructor(
        private _contractsService: ContractsService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._contractsService.onContractsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
