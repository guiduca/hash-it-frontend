import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Network } from './network.model';

@Injectable()
export class NetworksService implements Resolve<any>
{
    onNetworksChanged: BehaviorSubject<any>;
    onSelectedNetworksChanged: BehaviorSubject<any>;
    onNetworkDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    networks: Network[];
    network: any;
    selectedNetworks: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onNetworksChanged = new BehaviorSubject([]);
        this.onSelectedNetworksChanged = new BehaviorSubject([]);
        this.onNetworkDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getNetworks(),
                this.getNetworkData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getNetworks();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getNetworks();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get networks
     *
     * @returns {Promise<any>}
     */
    getNetworks(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/networks-networks')
                    .subscribe((response: any) => {

                        this.networks = response;

                        if ( this.filterBy === 'starred' )
                        {
                            this.networks = this.networks.filter(_network => {
                                return this.network.starred.includes(_network.id);
                            });
                        }

                        if ( this.filterBy === 'frequent' )
                        {
                            this.networks = this.networks.filter(_network => {
                                return this.network.frequentNetworks.includes(_network.id);
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.networks = FuseUtils.filterArrayByString(this.networks, this.searchText);
                        }

                        this.networks = this.networks.map(network => {
                            return new Network(network);
                        });

                        this.onNetworksChanged.next(this.networks);
                        resolve(this.networks);
                    }, reject);
            }
        );
    }

    /**
     * Get network data
     *
     * @returns {Promise<any>}
     */
    getNetworkData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/networks-network/3')
                    .subscribe((response: any) => {
                        this.network = response;
                        this.onNetworkDataChanged.next(this.network);
                        resolve(this.network);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected network by id
     *
     * @param id
     */
    toggleSelectedNetwork(id): void
    {
        // First, check if we already have that network as selected...
        if ( this.selectedNetworks.length > 0 )
        {
            const index = this.selectedNetworks.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedNetworks.splice(index, 1);

                // Trigger the next event
                this.onSelectedNetworksChanged.next(this.selectedNetworks);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedNetworks.push(id);

        // Trigger the next event
        this.onSelectedNetworksChanged.next(this.selectedNetworks);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedNetworks.length > 0 )
        {
            this.deselectNetworks();
        }
        else
        {
            this.selectNetworks();
        }
    }

    /**
     * Select networks
     *
     * @param filterParameter
     * @param filterValue
     */
    selectNetworks(filterParameter?, filterValue?): void
    {
        this.selectedNetworks = [];

        // If there is no filter, select all networks
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedNetworks = [];
            this.networks.map(network => {
                this.selectedNetworks.push(network.id);
            });
        }

        // Trigger the next event
        this.onSelectedNetworksChanged.next(this.selectedNetworks);
    }

    /**
     * Update network
     *
     * @param network
     * @returns {Promise<any>}
     */
    updateNetwork(network): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/networks-networks/' + network.id, {...network})
                .subscribe(response => {
                    this.getNetworks();
                    resolve(response);
                });
        });
    }

    /**
     * Update network data
     *
     * @param networkData
     * @returns {Promise<any>}
     */
    updateNetworkData(networkData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/networks-network/' + this.network.id, {...networkData})
                .subscribe(response => {
                    this.getNetworkData();
                    this.getNetworks();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect networks
     */
    deselectNetworks(): void
    {
        this.selectedNetworks = [];

        // Trigger the next event
        this.onSelectedNetworksChanged.next(this.selectedNetworks);
    }

    /**
     * Delete network
     *
     * @param network
     */
    deleteNetwork(network): void
    {
        const networkIndex = this.networks.indexOf(network);
        this.networks.splice(networkIndex, 1);
        this.onNetworksChanged.next(this.networks);
    }

    /**
     * Delete selected networks
     */
    deleteSelectedNetworks(): void
    {
        for ( const networkId of this.selectedNetworks )
        {
            const network = this.networks.find(_network => {
                return _network.id === networkId;
            });
            const networkIndex = this.networks.indexOf(network);
            this.networks.splice(networkIndex, 1);
        }
        this.onNetworksChanged.next(this.networks);
        this.deselectNetworks();
    }

}
