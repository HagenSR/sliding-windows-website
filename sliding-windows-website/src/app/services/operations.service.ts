import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public operations!: Operation[];

  constructor(private http: HttpClient) { 
    this.getOperations().subscribe((res) => {
      this.operations = res;
    })
  }

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(environment.ApiURL + 'get_operations');
  }
}
