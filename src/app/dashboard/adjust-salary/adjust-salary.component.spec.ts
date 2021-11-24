import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustSalaryComponent } from './adjust-salary.component';

describe('AdjustSalaryComponent', () => {
  let component: AdjustSalaryComponent;
  let fixture: ComponentFixture<AdjustSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
