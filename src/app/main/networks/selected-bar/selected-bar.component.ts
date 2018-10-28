import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { NetworksService } from '../networks.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class NetworksSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedNetworks: boolean;
    isIndeterminate: boolean;
    selectedNetworks: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {NetworksService} _networksService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _networksService: NetworksService,
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
        this._networksService.onSelectedNetworksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedNetworks => {
                this.selectedNetworks = selectedNetworks;
                setTimeout(() => {
                    this.hasSelectedNetworks = selectedNetworks.length > 0;
                    this.isIndeterminate = (selectedNetworks.length !== this._networksService.networks.length && selectedNetworks.length > 0);
                }, 0);
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
     * Select all
     */
    selectAll(): void
    {
        this._networksService.selectNetworks();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._networksService.deselectNetworks();
    }

    /**
     * Delete selected networks
     */
    deleteSelectedNetworks(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected networks?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._networksService.deleteSelectedNetworks();
                }
                this.confirmDialogRef = null;
            });
    }
}
