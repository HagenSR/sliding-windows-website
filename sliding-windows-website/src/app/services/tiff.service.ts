import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GeoTIFF, { fromBlob } from 'geotiff';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiffMetaData } from '../models/tiff_meta_data';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {

  }
};

@Injectable({
  providedIn: 'root'
})
export class TiffService {

  public tiffMetaData: BehaviorSubject<TiffMetaData | null> = new BehaviorSubject<TiffMetaData | null>(null);
  public rawProcessedBlob: BehaviorSubject<Blob | null> = new BehaviorSubject<Blob | null>(null)

  constructor(private http: HttpClient) {
    this.tiffMetaData.subscribe((res) => {
      if (res?.tiff_image_id) {
        this.retrieveTiff(res.tiff_image_id);
      }
    })
  }


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
      if (res) {
        this.rawProcessedBlob.next(res)
      } else {
        alert("error, no geotiff")
      }

    })
  }

  insertTiff(file: File, win_size: number, op_id: number, dtype: string): Promise<Boolean> {
    return new Promise(() => {
      const httpOptions = {
        headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }),
        params: {

        }
      };
      var params = new HttpParams();
      params = params.append("win_size", win_size);
      params = params.append("op_id", op_id);
      params = params.append("dtype", dtype);
      const formData = new FormData();
      formData.append("file", file, file.name);
      httpOptions.params = params
      this.http.post<TiffMetaData>(environment.ApiURL + 'insert_tiff', formData, httpOptions).subscribe({
        next: (res) => {
          this.tiffMetaData.next(res);
          return true;
        },
        error: (err) => {
          alert("Upload tiff file failed: " + err.error.error);
          return false;
        }
      })
    });
  }



  toArrayBuffer(buf: Uint16Array): ArrayBuffer {
    const ab = new ArrayBuffer(buf.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.byteLength; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }

  // convertToJPG(blob: Blob) {
  //   blob.arrayBuffer().then((arrBuf) => {
  //     let res = decode(arrBuf)
  //     console.log("huh")
  //   })
  // }
}
