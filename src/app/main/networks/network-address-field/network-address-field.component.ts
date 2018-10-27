import { Component, OnInit } from '@angular/core';
import { NetworkAddress } from './network-address';
import { NETWORK_ADDRESSES } from './mock-network-addresses';

@Component({
  selector: 'app-network-address-field',
  templateUrl: './network-address-field.component.html',
  styleUrls: ['./network-address-field.component.scss']
})
export class NetworkAddressFieldComponent implements OnInit {
  networkAddresses = NETWORK_ADDRESSES;

  constructor() { }

  ngOnInit() {
  }

}
