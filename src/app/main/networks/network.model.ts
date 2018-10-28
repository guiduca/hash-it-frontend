import { FuseUtils } from '@fuse/utils';

export class Network
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

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
            this.lastName = network.lastName || '';
            this.avatar = network.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = network.nickname || '';
            this.company = network.company || '';
            this.jobTitle = network.jobTitle || '';
            this.email = network.email || '';
            this.phone = network.phone || '';
            this.address = network.address || '';
            this.birthday = network.birhday || '';
            this.notes = network.notes || '';
        }
    }
}
