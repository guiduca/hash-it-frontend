import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Network } from '../network.model';

@Component({
    selector     : 'networks-network-form-dialog',
    templateUrl  : './network-form.component.html',
    styleUrls    : ['./network-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NetworksNetworkFormDialogComponent
{
    action: string;
    network: Network;
    networkForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<NetworksNetworkFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<NetworksNetworkFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'View Network';
            this.network = _data.network;
        }
        else
        {
            this.dialogTitle = 'New Network';
            this.network = new Network({});
        }

        this.networkForm = this.createNetworkForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create network form
     *
     * @returns {FormGroup}
     */
    createNetworkForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.network.id],
            name    : [this.network.name],
            no_nodes: [this.network.no_nodes],
            no_authorities  : [this.network.no_authorities],
            address: [this.network.address],
            created_by : [this.network.created_by],
            created_date: [this.network.created_date]
        });
    }
}
