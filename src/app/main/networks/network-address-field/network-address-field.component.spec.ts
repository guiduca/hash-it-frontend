import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAddressFieldComponent } from './network-address-field.component';

describe('NetworkAddressFieldComponent', () => {
  let component: NetworkAddressFieldComponent;
  let fixture: ComponentFixture<NetworkAddressFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkAddressFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAddressFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
