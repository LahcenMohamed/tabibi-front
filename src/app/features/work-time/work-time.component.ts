import { Component } from '@angular/core';
import { DayOfWeek, WorkTime } from '../../models/work-times/work-time';
import { WorkTimeService } from '../../services/work-time-services/work-time.service';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AddWorkTimeDialogComponent } from './add-work-time-dialog/add-work-time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-work-time',
  imports: [NgStyle, MatIcon],
  templateUrl: './work-time.component.html',
  styleUrl: './work-time.component.scss'
})
export class WorkTimeComponent {
  Add() {
    const ref = this.dialog.open(AddWorkTimeDialogComponent, {
          width: '70vw',     // desired width
          maxWidth: '3000px',
          height: '80vh',     // desired width
          maxHeight: '3000px',
          data: {}  // you can pass initial data here if needed
        });

        ref.afterClosed().subscribe((result: WorkTime | undefined) => {
          if (result) {
            this.workTimeServices.Add(result).subscribe({
              next: (response) => {
                this.snackBar.open("refersh please");
              },
              error: (err) => {
                console.log(err);
              }
            });
          } else {
            console.log('Dialog was cancelled');
          }
        });
  }

  workTimes!: WorkTime[];
  DayOfWeek: any = DayOfWeek;
  hours: string[] = [];

  /**
   *
   */
  constructor(private workTimeServices: WorkTimeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    for (let i = 6; i <= 23; i++) {
      this.hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    for (let i = 0; i <= 5; i++) {
      this.hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.workTimeServices.getAll().subscribe({
      next: (response) => {
        this.workTimes = response.data!;
      },
      error: (rerror) => {
        console.log(rerror.message);
      }
    })
  }

  filterByDay(day:DayOfWeek): WorkTime[] {
    return this.workTimes.filter(x => x.day === day);
  }

  calculateTimeBlockStyle(startTime: string, endTime: string): {[key: string]: string} {
    // Parse hours from time strings (assuming format like "08:00" or "17:30")
    const startHour = this.parseTimeToDecimal(startTime);
    const endHour = this.parseTimeToDecimal(endTime);

    // Calculate position and width based on 8AM (8.0) to 8PM (20.0) timeline
    const timelineStart = 6.0;
    const timelineStart1 = 0.0;
    const timelineEnd = 24.0;
    const timelineWidth = timelineEnd - timelineStart1;

    // Calculate left position (start) and width
    const leftPosition = ((startHour - timelineStart) / timelineWidth) * 100;
    const width = ((endHour - startHour) / timelineWidth) * 100;

    return {
      'left': `${leftPosition}%`,
      'width': `${width}%`
    };
  }

  // Helper method to parse time string to decimal number
  parseTimeToDecimal(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + (minutes / 60);
  }

  exportToCSV() {
    const csvData = this.convertToCSV(this.workTimes); // or this.employees
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'work-times.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array.map(row => {
      return Object.values(row).map(val =>
        typeof val === 'object' ? JSON.stringify(val) : `"${val}"`).join(',');
    }).join('\r\n');
  }
}
