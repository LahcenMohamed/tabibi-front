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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../shared/componenets/spinner/spinner.component';
import { CustomSnackbarComponent } from '../../shared/componenets/custom-snackbar/custom-snackbar.component';
import { ConfirmDialogComponent } from '../../shared/componenets/confirm-dialog/confirm-dialog.component';

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


  constructor(
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    const token = localStorage.getItem('token');
    console.log(token);
  }

  JobType = JobType;

  getJobTypeName(value: number): string {
    return JobType[value];
  }

  search(): void {
    const term = this.searchItem.toLowerCase();
    this.filteredEmployees.data = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term)
    );
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this employee? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    // Handle dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const spinner = this.dialog.open(SpinnerComponent);
        this._employeeService.delete(id).subscribe({
          next: (response) => {
            //this.filteredEmployees.data = [...this.filteredEmployees.data, result];
            this.filteredEmployees.data = this.filteredEmployees.data.filter(emp => emp.id !== id);
            spinner.close();
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: 'Employee deleted successfully',
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
                message: 'Failed to delete employee',
                type: 'error'
              },
              panelClass: ['custom-snackbar-container']
            });
          }
        });
      }});
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
          const spinner = this.dialog.open(SpinnerComponent);
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
                emp.firstName = result.firstName;
                emp.middelName = result.middelName;
                emp.lastName = result.lastName;
                emp.phoneNumber = result.phoneNumber;
                emp.email = result.email;
                emp.address = result.address;
                emp.salary = result.salary;
                emp.jobType = result.jobType;
                emp.description = result.description;
                spinner.close();
                this.snackBar.openFromComponent(CustomSnackbarComponent, {
                  data: {
                    message: 'Employee updated successfully',
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
                    message: 'Failed to update employee',
                    type: 'error'
                  },
                  panelClass: ['custom-snackbar-container']
                });
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
        const spinner = this.dialog.open(SpinnerComponent);
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
            spinner.close();
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: 'Employee created successfully',
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
                message: 'Failed to create employee',
                type: 'error'
              },
              panelClass: ['custom-snackbar-container']
            });
          }
        })
      } else {
        console.log('Dialog was cancelled');
      }
    });
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




