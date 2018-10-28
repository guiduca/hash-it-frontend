import { FuseUtils } from '@fuse/utils';

export class Contract
{
    id: string;
    name: string;
    no_nodes: string;
    no_authorities: string;
    address: string;
    created_by: string;
    created_date: string;

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
            this.no_nodes = contract.no_nodes || '';
            this.no_authorities = contract.no_authorities || '';
            this.address = contract.address || '';
            this.created_by = contract.created_by || '';
            this.created_date = contract.created_date || '';
        }
    }
}
