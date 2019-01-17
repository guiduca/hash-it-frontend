import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInterfaceComponent } from './code-interface.component';

describe('CodeInterfaceComponent', () => {
  let component: CodeInterfaceComponent;
  let fixture: ComponentFixture<CodeInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
