import { Injectable } from '@angular/core';
import { TiffMetaData } from '../models/tiff_meta_data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LatLngBounds } from 'leaflet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {

  }
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public TiffData: Subject<TiffMetaData[]> = new Subject();

  constructor(private http: HttpClient) { 

  }

  searchArea(bounds : LatLngBounds){
     var params = this.determineMin(bounds)
    httpOptions.params = params
    this.http.get<TiffMetaData[]>(environment.ApiURL + 'get_tiffs_inside_bounds', httpOptions).subscribe({
      next: (res) => {
        this.TiffData.next(res);
      },
      error: (err) => {
        alert("Search Failed: " + err.error.error);
      }
    });
  }

  private determineMin(bounds : LatLngBounds) : HttpParams{
    var params = new HttpParams();
    if(bounds.getNorth() < bounds.getSouth()){
      params = params.append("min_y", bounds.getNorth())
      params = params.append("max_y", bounds.getSouth())
    }else{
      params = params.append("min_y", bounds.getSouth())
      params = params.append("max_y", bounds.getNorth())
    }
    if(bounds.getEast() < bounds.getWest()){
      params = params.append("min_x", bounds.getEast())
      params = params.append("max_x", bounds.getWest())
    }else{
      params = params.append("min_x", bounds.getWest())
      params = params.append("max_x", bounds.getEast())
    }
    return params
  }



}
