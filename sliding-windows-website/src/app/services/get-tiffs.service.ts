import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTiffsService {

  constructor(private http: HttpClient) {

   }

   getExampleTiff(){
    return this.http.get<Blob>(environment.ApiURL + "get-tiff-byte-array");
   }
}
