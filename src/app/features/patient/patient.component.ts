import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BloodPressure, MedicalFile } from '../../models/patients/medical-file';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalFileService } from '../../services/medical-files/medical-file.service';
import { Patient } from '../../models/patients/patient';
import { PatientService } from '../../services/patient-services/patient.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Gender } from '../auth/services/sign-data-service/sign-up-data.service';
import { Disease, DiseaseBase } from '../../models/patients/medical-history';
import { MedicalHistoryService } from '../../services/medical-history/medical-history.service';

@Component({
  selector: 'app-patient',
  imports: [NgxChartsModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  patientId!: string;
  bloodSugras: ChartDataPoint[] = [];
  heights: ChartDataPoint[] = [];
  weights: ChartDataPoint[] = [];
  temperatures: ChartDataPoint[] = [];
  bloodPressures: ChartDataPoint[] = [];
  geneticDiseases: DiseaseBase[] = [];
  allergies: DiseaseBase[] = [];
  addications: DiseaseBase[] = [];
  chronicDiseases: DiseaseBase[] = [];
  disease: Disease[] = [];
  patient!: Patient;


  colorScheme = {
    domain: ['#5AA454']
  };

  /**
   *
   */
  constructor(
    private patientService: PatientService,
    private router: ActivatedRoute,
    private medicalFileService: MedicalFileService,
    private medicalHistoryService: MedicalHistoryService) {
      this.patient = patientService.getData()!;
    this.router.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      if (this.patientId) {
        this.loadData();
      } else {
        console.error('Missing workScheduleId query param');
      }
    });

  }
  loadData() {
    this.medicalFileService.getBloodSugarsByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.bloodSugras = this.transformData(response.data!);
      }
    });
    this.medicalFileService.getHeightsByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.heights = this.transformData(response.data!);
      }
    });
    this.medicalFileService.getWeightsByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.weights = this.transformData(response.data!);
      }
    });
    this.medicalFileService.getTemperaturesByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.temperatures = this.transformData(response.data!);
      }
    });

    this.medicalFileService.getBloodPressuresByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.bloodPressures = this.toBloodPressureChartData(response.data!);
      }
    });

    this.medicalHistoryService.getGeneticDiseasesByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.geneticDiseases = response.data!;
      }
    });

    this.medicalHistoryService.getAllergiesByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.allergies = response.data!;
      }
    });

    this.medicalHistoryService.getAddictionsByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.addications = response.data!;
      }
    });

    this.medicalHistoryService.getChronicDiseasesByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.chronicDiseases = response.data!;
      }
    });

    this.medicalHistoryService.getDiseasesByPatientId(this.patientId).subscribe({
      next: (response) => {
        this.disease = response.data!;
      }
    });
  }

  transformData(data: MedicalFile[]): any[] {
    return [
      {
        name: `Test`,
        series: data.map(record => ({
          name: record.createdAt,       // Must be a string or Date
          value: record.value      // e.g., blood pressure, heart rate, etc.
        }))
      }
    ];
  }

  toBloodPressureChartData(data: BloodPressure[]): any[] {
    const minSeries = {
      name: 'Min',
      series: data.map(bp => ({
        name: bp.createdAt, // Format date
        value: bp.minValue
      }))
    };

    const maxSeries = {
      name: 'Max',
      series: data.map(bp => ({
        name: bp.createdAt,
        value: bp.maxValue
      }))
    };

    return [minSeries, maxSeries];
  }

  get genderIcon(): string {
    switch (this.patient.gender) {
      case Gender.Male:   return 'male';
      case Gender.Female: return 'female';
      default:            return 'person';
    }
  }
}



export interface ChartDataPoint {
  name: string; // x-axis (createdAt as string)
  value: number; // y-axis (value)
}
