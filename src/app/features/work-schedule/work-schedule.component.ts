import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkScheduleService } from '../../services/work-schedules/work-schedule.service';
import { CreateWorkSchedule, WorkSchedule } from '../../models/work-schedules/work-schedule';
import { AddWorkTimeDialogComponent } from '../work-time/add-work-time-dialog/add-work-time-dialog.component';
import { AddWorkSchduleDialogComponent } from './add-work-schdule-dialog/add-work-schdule-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomSnackbarComponent } from '../../shared/componenets/custom-snackbar/custom-snackbar.component';
import { SpinnerComponent } from '../../shared/componenets/spinner/spinner.component';

@Component({
  selector: 'app-work-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './work-schedule.component.html',
  styleUrl: './work-schedule.component.scss'
})
export class WorkScheduleComponent implements OnInit {
  workSchedules: WorkSchedule[] = [];
  workSchedulesLoaded = false;
  selectedDate: Date = new Date();
  dateClassFn: (date: Date) => string[];

  constructor(
    private workScheduleService: WorkScheduleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dateClassFn = this.dateClass.bind(this);
  }

  ngOnInit() {
    this.loadWorkSchedules();
  }

  loadWorkSchedules() {
    this.workScheduleService.getAll().subscribe({
      next: (result) => {
        this.workSchedules = result.data!;
        this.workSchedulesLoaded = true;
      },
      error: (error) => {
        console.error('Error loading work schedules:', error);
      }
    });
  }


  private isDateHasSchedule(date: Date): boolean {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    return this.workSchedules.some(schedule => {
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === target.getTime();
    });
  }

  onDateSelected(date: Date | null) {
    if (!date) return;
    const y = date.getFullYear();
    const m = `${date.getMonth()+1}`.padStart(2,'0');
    const d = `${date.getDate()}`.padStart(2,'0');
    console.log(`${y}-${m}-${d}`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today && !this.isDateHasSchedule(date)) {
      const ref = this.dialog.open(AddWorkSchduleDialogComponent, {
        width: '600px'
      });

      ref.afterClosed().subscribe((result: number | undefined) => {
        if (result) {
          const spinner = this.dialog.open(SpinnerComponent);
          const newSchedule: CreateWorkSchedule = {
            date: `${y}-${m}-${d}`,
            maxAppointmentsCount: result
          };
          this.workScheduleService.Add(newSchedule).subscribe({
            next: (response) => {
              spinner.close();
              const addedSchedule: WorkSchedule = {
                id: response.data!,
                date: date,
                maxAppointmentsCount: newSchedule.maxAppointmentsCount
              };
              this.workSchedules.push(addedSchedule);
              this.workSchedulesLoaded = true;
              this.snackBar.openFromComponent(CustomSnackbarComponent, {
                data: {
                  message: 'Work schedule added successfully',
                  type: 'success'
                },
                panelClass: ['custom-snackbar-container']
              });
            },
            error: (err) => {
              console.log(err);
              spinner.close();
              this.snackBar.openFromComponent(CustomSnackbarComponent, {
                data: {
                  message: 'Failed to add work schedule',
                  type: 'error'
                },
                panelClass: ['custom-snackbar-container']
              });
            }
          });
        } else {
          console.log('Dialog was cancelled');
        }
      });
    }
    else if (this.isDateHasSchedule(date)) {
      const target = new Date(date);
      target.setHours(0, 0, 0, 0);
      let workS = this.workSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        scheduleDate.setHours(0, 0, 0, 0);
        return scheduleDate.getTime() === target.getTime();
      })[0];
      this.router.navigate(['appointments'], { queryParams: { workScheduleId: workS.id } });
    } else {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message: 'You cannot add a schedule for a past date.',
          type: 'info'
        },
        panelClass: ['custom-snackbar-container']
      });
    }
  }

  dateClass = (date: Date): string[] => {
    const classes: string[] = [];

    if (!this.workSchedulesLoaded) {
      return classes; // no class until data is ready
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.isDateHasSchedule(date)) {
      classes.push('has-schedule');
    }

    if (date >= today) {
      classes.push('future-date');
    }

    return classes;
  };
}
