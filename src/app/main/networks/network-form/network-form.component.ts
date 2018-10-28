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
            this.dialogTitle = 'Edit Network';
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
            lastName: [this.network.lastName],
            avatar  : [this.network.avatar],
            nickname: [this.network.nickname],
            company : [this.network.company],
            jobTitle: [this.network.jobTitle],
            email   : [this.network.email],
            phone   : [this.network.phone],
            address : [this.network.address],
            birthday: [this.network.birthday],
            notes   : [this.network.notes]
        });
    }
}
