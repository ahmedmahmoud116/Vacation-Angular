import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'https://localhost:5001/api/Employee';
  allEmployees : Observable<Employee[]>;
  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/' + employeeId);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Employee>(this.url, employee, httpOptions);
  }
  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Employee>(this.url + '/' + employeeId, employee, httpOptions);
  }
  deleteEmployeeById(employeeid: number): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Employee>(this.url + '/' +employeeid, httpOptions);
  }
}
