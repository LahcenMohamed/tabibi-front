import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from '../../models/appointments/appointment';
import { AppointmentService } from '../../services/appointments/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentStatus } from '../../models/patients/patient';
import { PatientService } from '../../services/patient-services/patient.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  workScheduleId!: string;
  displayedColumns: string[] = ['number', 'patientName', 'phoneNumber', 'gender', 'status', 'actions'];
  AppointmentStatus = AppointmentStatus; // Make enum available in template

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private patientSerivce: PatientService,
    private router: Router

  ) {
    this.route.queryParams.subscribe(params => {
      this.workScheduleId = params['workScheduleId'];
      if (this.workScheduleId) {
        this.loadAppointments();
      } else {
        console.error('Missing workScheduleId query param');
      }
    });
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAll(this.workScheduleId).subscribe({
      next: (response) => {
          this.appointments = response.data!;

      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  openDetails(appointment: Appointment) {
    this.patientSerivce.setData(appointment.patient);
    this.router.navigate(['patient'], { queryParams: { patientId: appointment.patient.id } });
  }

  getStatusClass(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.Confirmed:
        return 'status-confirmed';
      case AppointmentStatus.Panding:
        return 'status-pending';
      case AppointmentStatus.Canceld:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  cancel(id: string) {
    this.appointmentService.cancel(id).subscribe({
      next: (response) => {
          this.loadAppointments();
        }
      , error: (error) => {
        console.error('Error cancelling appointment:', error);
      }
    });
  }
  confirm(id: string) {
    this.appointmentService.confirm(id).subscribe({
      next: (response) => {
          this.loadAppointments();
        }
      , error: (error) => {
        console.error('Error confirming appointment:', error);
      }
    });
  }
}
