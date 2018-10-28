import { FuseUtils } from '@fuse/utils';

export class Contract
{
    id: string;
    name: string;
    network: string;
    contract_code: string;
    created_by: string;

    /**
     * Constructor
     *
     * @param contract
     */
    constructor(contract)
    {
        {
            this.id = contract.id || FuseUtils.generateGUID();
            this.name = contract.name || '';
            this.network = contract.network || '';
            this.contract_code = contract.contract_code || '';
            this.created_by = contract.created_by || '';

        }
    }
}
