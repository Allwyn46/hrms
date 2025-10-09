import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditSheet } from './employee-edit-sheet';

describe('EmployeeEditSheet', () => {
  let component: EmployeeEditSheet;
  let fixture: ComponentFixture<EmployeeEditSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEditSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
