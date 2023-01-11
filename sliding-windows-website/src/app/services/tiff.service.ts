import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GeoTIFF, { fromBlob } from 'geotiff';
import { decode } from 'tiff';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {

  }
};

@Injectable({
  providedIn: 'root'
})
export class TiffService {

  public uploadedTiff: BehaviorSubject<GeoTIFF | null> = new BehaviorSubject<GeoTIFF | null>(null)
  public processedTiff: BehaviorSubject<GeoTIFF | null> = new BehaviorSubject<GeoTIFF | null>(null)
  public jpgOfProcessed: BehaviorSubject<GeoTIFF | null> = new BehaviorSubject<GeoTIFF | null>(null)

  constructor(private http: HttpClient) { }


  checkIfTiffExists(tiff_sha256: string): Observable<boolean> {
    var params = new HttpParams();
    params = params.append("file_sha256", tiff_sha256)
    httpOptions.params = params
    return this.http.get<boolean>(environment.ApiURL + 'check_for_tiff', httpOptions);
  }

  retrieveTiff(img_id: number): void {
    var params = new HttpParams();
    httpOptions.params = params
    fetch(environment.ApiURL + 'retrieve_tiff?img_id=' + img_id).then(res => res.blob()).then((res) => {
      this.convertToJPG(res);
      fromBlob(res).then((newGeoTiff) => {
        this.processedTiff.next(newGeoTiff);
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  toArrayBuffer(buf: Uint16Array): ArrayBuffer {
    const ab = new ArrayBuffer(buf.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.byteLength; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }

  convertToJPG(blob: Blob) {
    blob.arrayBuffer().then((arrBuf) => {
      let res = decode(arrBuf)
      console.log("huh")
    })
  }
}
