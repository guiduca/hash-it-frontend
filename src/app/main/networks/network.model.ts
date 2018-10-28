import { FuseUtils } from '@fuse/utils';

export class Network
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
     * @param network
     */
    constructor(network)
    {
        {
            this.id = network.id || FuseUtils.generateGUID();
            this.name = network.name || '';
            this.no_nodes = network.no_nodes || '';
            this.no_authorities = network.no_authorities || '';
            this.address = network.address || '';
            this.created_by = network.created_by || '';
            this.created_date = network.created_date || '';
        }
    }
}
