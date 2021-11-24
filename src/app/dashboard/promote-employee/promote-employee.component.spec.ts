import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteEmployeeComponent } from './promote-employee.component';

describe('PromoteEmployeeComponent', () => {
  let component: PromoteEmployeeComponent;
  let fixture: ComponentFixture<PromoteEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
