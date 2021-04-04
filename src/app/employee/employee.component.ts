import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees:any =  [];
  employeeIdUpdate = null as any;
  message = null as any;
  // loadedEmployees : Employee[];

  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    // this.loadedEmployees = [];
    this.loadAllEmployees();
  }
  loadAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(employee =>{
      console.log(employee);
      this.allEmployees = employee;
    });

  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }
  loadEmployeeToEdit(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {
      this.message = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.id;
      this.employeeForm.controls['fullName'].setValue(employee.fullName);
      this.employeeForm.controls['birthDate'].setValue(employee.birthDate);
      this.employeeForm.controls['email'].setValue(employee.email);
      this.employeeForm.controls['gender'].setValue(employee.gender);
    });

  }
  CreateEmployee(employee: Employee) {
    console.log(this.employeeIdUpdate);
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Successfully';
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.id = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }
  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {
      this.dataSaved = true;
      this.message = 'Record Deleted Succefully';
      this.loadAllEmployees();
      this.employeeIdUpdate = null;
      this.employeeForm.reset();

    });
  }
}
  resetForm() {
    this.employeeForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

  compare(str1 : string, str2 : string){
     return str1.localeCompare(str2) == 0;
  }
}
