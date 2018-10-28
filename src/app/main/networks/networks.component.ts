import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { NetworksService } from './networks.service';
import { NetworksNetworkFormDialogComponent } from './network-form/network-form.component';

@Component({
    selector     : 'networks',
    templateUrl  : './networks.component.html',
    styleUrls    : ['./networks.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class NetworksComponent implements OnInit, OnDestroy
{
    dialogRef: any;

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
     * New network
     */
    newNetwork(): void
    {
        this.dialogRef = this._matDialog.open(NetworksNetworkFormDialogComponent, {
            panelClass: 'network-form-dialog',
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

                this._networksService.updateNetwork(response.getRawValue());
            });
    }
}
