import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Contract } from '../contracts.model';

@Component({
    selector     : 'contracts-contract-form-dialog',
    templateUrl  : './contract-form.component.html',
    styleUrls    : ['./contract-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContractsContractFormDialogComponent
{
    action: string;
    contract: Contract;
    contractForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContractsContractFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContractsContractFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'View Contract';
            this.contract = _data.contract;
        }
        else
        {
            this.dialogTitle = 'New Contract';
            this.contract = new Contract({});
        }

        this.contractForm = this.createContractForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contract form
     *
     * @returns {FormGroup}
     */
    createContractForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.contract.id],
            name    : [this.contract.name],
            network: [this.contract.network],
            created_by : [this.contract.created_by],
            contract_code: [this.contract.contract_code]
        });
    }
}
