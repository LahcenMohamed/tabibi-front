import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkSchduleDialogComponent } from './add-work-schdule-dialog.component';

describe('AddWorkSchduleDialogComponent', () => {
  let component: AddWorkSchduleDialogComponent;
  let fixture: ComponentFixture<AddWorkSchduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkSchduleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkSchduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
