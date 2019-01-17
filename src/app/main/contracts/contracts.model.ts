import { FuseUtils } from '@fuse/utils';

export class Contract {
    id: string;
    name: string;
    network: string;
    contract_code: string;
    token_type: string;
    created_by: string;
    contract_type: string;
    token_name: string;
    symbol: string;
    max_supply: number;
    max_decimal: number;


    /**
     * Constructor
     *
     * @param contract
     */
    constructor(contract) {
        {
            this.id = contract.id || FuseUtils.generateGUID();
            this.name = contract.name || '';
            this.network = contract.network || '';
            this.contract_code = contract.contract_code || '';
            this.created_by = contract.created_by || '';

        }
    }
}
