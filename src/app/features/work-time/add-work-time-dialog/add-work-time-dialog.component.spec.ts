import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkTimeDialogComponent } from './add-work-time-dialog.component';

describe('AddWorkTimeDialogComponent', () => {
  let component: AddWorkTimeDialogComponent;
  let fixture: ComponentFixture<AddWorkTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkTimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
