import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {
  name: string;
  noOfNodes: number;
  noOfAuthorities: number;
  createdBy: string;
  createdTime: string;

  networks: any[];

  constructor() {

    this.networks = [
      { name: 'network a', noOfNodes: 2, noOfAuthorities: 1, createdBy: 'Tom', createdTime: '27 Oct 2018, 0800'},
      { name: 'network b', noOfNodes: 1, noOfAuthorities: 1, createdBy: 'Peter', createdTime: '27 Oct 2018, 1000'},
      { name: 'network c', noOfNodes: 1, noOfAuthorities: 2, createdBy: 'Gwen', createdTime: '27 Oct 2018, 1130'},
      { name: 'network d', noOfNodes: 3, noOfAuthorities: 2, createdBy: 'Riddler', createdTime: '27 Oct 2018, 1300'},
    ];
  }

  ngOnInit() {
  }

  addNewRow():void {
    this.networks.push({ name: 'network d', noOfNodes: 3, noOfAuthorities: 2, createdBy: 'Riddler', createdTime: '27 Oct 2018, 1300'})
  }

}
