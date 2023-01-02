import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GeoTIFF from 'geotiff';
import { BehaviorSubject, buffer, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fromArrayBuffer } from 'geotiff';
import { Buffer } from 'buffer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {

  }
};

@Injectable({
  providedIn: 'root'
})
export class TiffService {

  public currentTiff: BehaviorSubject<GeoTIFF | null> = new BehaviorSubject<GeoTIFF | null>(null)

  constructor(private http: HttpClient) { }


  checkIfTiffExists(tiff_sha256: string): Observable<boolean> {
    var params = new HttpParams();
    params = params.append("file_sha256", tiff_sha256)
    httpOptions.params = params
    return this.http.get<boolean>(environment.ApiURL + 'check_for_tiff', httpOptions);
  }

  retrieveTiff(tiff_sha256: string): void {
    var params = new HttpParams();
    params = params.append("file_sha256", tiff_sha256)
    httpOptions.params = params
    this.http.get<string>(environment.ApiURL + 'retrieve_tiff', httpOptions).subscribe((base64Tiff) => {
      let enc = new TextEncoder();
      let uintbuff = enc.encode(atob(base64Tiff));
      let arrayBuffer = this.toArrayBuffer(uintbuff);
      fromArrayBuffer(arrayBuffer).then((newGeoTiff) => {
        this.currentTiff.next(newGeoTiff);
      }).catch((err) => {
        console.log(err)
      })
    });
  }

  private toArrayBuffer(buf: Uint8Array) {
    const ab = new ArrayBuffer(buf.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.byteLength; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }


}
