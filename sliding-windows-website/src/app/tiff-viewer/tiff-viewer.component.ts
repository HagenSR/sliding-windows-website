import { Component, OnInit } from '@angular/core';
import { GeoTIFF, fromBlob } from "geotiff";
import { GetTiffsService } from '../services/get-tiffs.service';

@Component({
  selector: 'app-tiff-viewer',
  templateUrl: './tiff-viewer.component.html',
  styleUrls: ['./tiff-viewer.component.css']
})
export class TiffViewerComponent implements OnInit {

  image 

  constructor(private  tiffService : GetTiffsService) { }

  ngOnInit(): void {
    this.tiffService.getExampleTiff().subscribe((result : Blob) => {
      fromBlob(result).then((tiff : GeoTIFF) => {
          tiff.getImage().then((result) => {
            result
          });
      })
    });
  }

}
