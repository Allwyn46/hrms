import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddSheet } from './employee-add-sheet';

describe('EmployeeAddSheet', () => {
  let component: EmployeeAddSheet;
  let fixture: ComponentFixture<EmployeeAddSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
