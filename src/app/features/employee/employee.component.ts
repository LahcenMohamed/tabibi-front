import { Component, NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import {Employee, JobType } from '../../models/employees/employee';
import {CreateEmployeeRequest} from '../../models/employees/create-employee-request';
import { EmployeeService } from '../../services/employee-services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmployeeRequest } from '../../models/employees/update-employee-request';

@Component({
  selector: 'app-employee',
  imports: [MatIcon, MatTableModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  searchItem!: string;
  employees!: Employee[];
  filteredEmployees = new MatTableDataSource<Employee>();

  employeesHeaders: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'salary', 'jobType', 'actions'];
  search(): void {
    const term = this.searchItem.toLowerCase();
    this.filteredEmployees.data = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term)
    );
  }

  delete(id: string) {
    this._employeeService.delete(id).subscribe({
      next: (response) => {
        //this.filteredEmployees.data = [...this.filteredEmployees.data, result];
        console.log("object");
      },
      error: (err) => {
        console.log(err);
      }
    })
    }
  Update(emp: Employee) {
    const ref = this.dialog.open(CreateEmployeeDialogComponent, {
      width: '70vw',     // desired width
      maxWidth: '3000px',
      height: '80vh',     // desired width
      maxHeight: '3000px',
      data: emp || null // you can pass initial data here if needed
    });
      ref.afterClosed().subscribe((result: Employee | undefined) => {
        if(result){
          let empReq: UpdateEmployeeRequest= {
            id: emp.id,
            fullName: {
              firstName: result.firstName,
              middelName: result.middelName,
              lastName: result.lastName,
            },
            phoneNumber: result.phoneNumber,
            email: result.email,
            address: result.address,
            salary: result.salary,
            jobType: result.jobType,
            description: result.description
          }
            this._employeeService.update(empReq).subscribe({
              next: (response) => {
                //this.filteredEmployees.data = [...this.filteredEmployees.data, result];
              },
              error: (err) => {
                console.log(err);
              }
            })
          } else {
            console.log('Dialog was cancelled');
          }
        });
    }
Add() {
    const ref = this.dialog.open(CreateEmployeeDialogComponent, {
      width: '70vw',     // desired width
      maxWidth: '3000px',
      height: '80vh',     // desired width
      maxHeight: '3000px',
      data: {}  // you can pass initial data here if needed
    });

    ref.afterClosed().subscribe((result: Employee | undefined) => {
      if (result) {
        console.log('New employee data:', result);
        let emp: CreateEmployeeRequest= {
          fullName: {
            firstName: result.firstName,
            middelName: result.middelName,
            lastName: result.lastName,
          },
          phoneNumber: result.phoneNumber,
          email: result.email,
          address: result.address,
          salary: result.salary,
          jobType: result.jobType,
          description: result.description
        }
        this._employeeService.createEmployee(emp).subscribe({
          next: (response) => {
            this.filteredEmployees.data = [...this.filteredEmployees.data, result];
          },
          error: (err) => {
            console.log(err);
          }
        })
      } else {
        console.log('Dialog was cancelled');
      }
    });

}
  constructor(private _employeeService: EmployeeService, private dialog: MatDialog) {
    const token = localStorage.getItem('token');
    console.log(token);
  }

  JobType = JobType;

  getJobTypeName(value: number): string {
    return JobType[value];
  }
onInputChange($event: Event) {
throw new Error('Method not implemented.');
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this._employeeService.getAll().subscribe({
    next: (response) => {
      this.employees = response.data!;
      this.filteredEmployees.data = [...this.employees];
    },
    error: (rerror) => {
      console.log(rerror.message);
    }
  })
}

exportToCSV() {
  const csvData = this.convertToCSV(this.filteredEmployees.data); // or this.employees
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'employees.csv');
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

sortDirection: 'asc' | 'desc' = 'asc';

sortBy(field: keyof Employee) {
  const direction = this.sortDirection === 'asc' ? 1 : -1;

  this.filteredEmployees.data = [...this.filteredEmployees.data].sort((a, b) => {
    const aValue = this.getNestedValue(a, field);
    const bValue = this.getNestedValue(b, field);

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return aValue.toString().localeCompare(bValue.toString()) * direction;
  });

  // Toggle direction
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}




