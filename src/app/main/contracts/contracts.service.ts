import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Contract } from './contracts.model';

@Injectable()
export class ContractsService implements Resolve<any>
{
    onContractsChanged: BehaviorSubject<any>;
    onSelectedContractsChanged: BehaviorSubject<any>;
    onContractDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    contracts: Contract[];
    contract: any;
    selectedContracts: string[] = [];

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
        this.onContractsChanged = new BehaviorSubject([]);
        this.onSelectedContractsChanged = new BehaviorSubject([]);
        this.onContractDataChanged = new BehaviorSubject([]);
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
                this.getContracts(),
                this.getContractData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContracts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getContracts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contracts
     *
     * @returns {Promise<any>}
     */
    getContracts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contracts-contracts')
                    .subscribe((response: any) => {

                        this.contracts = response;

                        if ( this.filterBy === 'starred' )
                        {
                            this.contracts = this.contracts.filter(_contract => {
                                return this.contract.starred.includes(_contract.id);
                            });
                        }

                        if ( this.filterBy === 'frequent' )
                        {
                            this.contracts = this.contracts.filter(_contract => {
                                return this.contract.frequentContracts.includes(_contract.id);
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.contracts = FuseUtils.filterArrayByString(this.contracts, this.searchText);
                        }

                        this.contracts = this.contracts.map(contract => {
                            return new Contract(contract);
                        });

                        this.onContractsChanged.next(this.contracts);
                        resolve(this.contracts);
                    }, reject);
            }
        );
    }

    /**
     * Get contract data
     *
     * @returns {Promise<any>}
     */
    getContractData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contracts-contract/3')
                    .subscribe((response: any) => {
                        this.contract = response;
                        this.onContractDataChanged.next(this.contract);
                        resolve(this.contract);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected contract by id
     *
     * @param id
     */
    toggleSelectedContract(id): void
    {
        // First, check if we already have that contract as selected...
        if ( this.selectedContracts.length > 0 )
        {
            const index = this.selectedContracts.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedContracts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContractsChanged.next(this.selectedContracts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContracts.push(id);

        // Trigger the next event
        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedContracts.length > 0 )
        {
            this.deselectContracts();
        }
        else
        {
            this.selectContracts();
        }
    }

    /**
     * Select contracts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContracts(filterParameter?, filterValue?): void
    {
        this.selectedContracts = [];

        // If there is no filter, select all contracts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedContracts = [];
            this.contracts.map(contract => {
                this.selectedContracts.push(contract.id);
            });
        }

        // Trigger the next event
        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    /**
     * Update contract
     *
     * @param contract
     * @returns {Promise<any>}
     */
    updateContract(contract): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/contracts-contracts/' + contract.id, {...contract})
                .subscribe(response => {
                    this.getContracts();
                    resolve(response);
                });
        });
    }

    /**
     * Update contract data
     *
     * @param contractData
     * @returns {Promise<any>}
     */
    updateContractData(contractData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contracts-contract/' + this.contract.id, {...contractData})
                .subscribe(response => {
                    this.getContractData();
                    this.getContracts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contracts
     */
    deselectContracts(): void
    {
        this.selectedContracts = [];

        // Trigger the next event
        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    /**
     * Delete contract
     *
     * @param contract
     */
    deleteContract(contract): void
    {
        const contractIndex = this.contracts.indexOf(contract);
        this.contracts.splice(contractIndex, 1);
        this.onContractsChanged.next(this.contracts);
    }

    /**
     * Delete selected contracts
     */
    deleteSelectedContracts(): void
    {
        for ( const contractId of this.selectedContracts )
        {
            const contract = this.contracts.find(_contract => {
                return _contract.id === contractId;
            });
            const contractIndex = this.contracts.indexOf(contract);
            this.contracts.splice(contractIndex, 1);
        }
        this.onContractsChanged.next(this.contracts);
        this.deselectContracts();
    }

}
