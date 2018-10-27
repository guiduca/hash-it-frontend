import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboards',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard'
    },
    {
        id       : 'networks',
        title    : 'Networks',
        type     : 'item',
        icon     : 'settings_ethernet',
        url      : '/networks'
    }
];
