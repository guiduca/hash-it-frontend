import { Component, OnInit, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'contracts-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent {
  @Input() contractForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
