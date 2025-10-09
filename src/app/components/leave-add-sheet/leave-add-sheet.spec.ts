import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAddSheet } from './leave-add-sheet';

describe('LeaveAddSheet', () => {
  let component: LeaveAddSheet;
  let fixture: ComponentFixture<LeaveAddSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveAddSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAddSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
