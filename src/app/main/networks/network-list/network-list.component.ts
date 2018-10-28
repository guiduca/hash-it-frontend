import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { NetworksService } from '../networks.service';
import { NetworksNetworkFormDialogComponent } from '../network-form/network-form.component';

@Component({
    selector     : 'networks-network-list',
    templateUrl  : './network-list.component.html',
    styleUrls    : ['./network-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class NetworksNetworkListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    networks: any;
    network: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'no_nodes', 'no_authorities', 'created_by'];
    selectedNetworks: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

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
        this.dataSource = new FilesDataSource(this._networksService);

        this._networksService.onNetworksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(networks => {
                this.networks = networks;

                this.checkboxes = {};
                networks.map(network => {
                    this.checkboxes[network.id] = false;
                });
            });

        this._networksService.onSelectedNetworksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedNetworks => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedNetworks.includes(id);
                }
                this.selectedNetworks = selectedNetworks;
            });

        this._networksService.onNetworkDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(network => {
                this.network = network;
            });

        this._networksService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._networksService.deselectNetworks();
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
     * Edit network
     *
     * @param network
     */
    editNetwork(network): void
    {
        this.dialogRef = this._matDialog.open(NetworksNetworkFormDialogComponent, {
            panelClass: 'network-form-dialog',
            data      : {
                network: network,
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

                        this._networksService.updateNetwork(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteNetwork(network);

                        break;
                }
            });
    }

    /**
     * Delete Network
     */
    deleteNetwork(network): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._networksService.deleteNetwork(network);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param networkId
     */
    onSelectedChange(networkId): void
    {
        this._networksService.toggleSelectedNetwork(networkId);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {NetworksService} _networksService
     */
    constructor(
        private _networksService: NetworksService
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
        return this._networksService.onNetworksChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
