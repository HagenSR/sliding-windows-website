import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as LeafletGeotiff from "src/assets/leaflet-geotiff-2/dist/leaflet-geotiff.js";
// import * as rgb from "leaflet-geotiff-rgb";
import { TiffService } from './tiff.service';
import { fromArrayBuffer } from 'geotiff';

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {

  private map!: L.Map;
  private currTiffLayer!: L.Layer | null;
  private options : any;

  constructor(private tiffService: TiffService) {
    LeafletGeotiff.h = "hi";
    // rgb.h = "hi";
    this.options  = {
      // See renderer sections below.
      // One of: L.LeafletGeotiff.rgb, L.LeafletGeotiff.plotty, L.LeafletGeotiff.vectorArrows
      renderer : undefined,
    
      // Use a worker thread for some initial compute (recommended for larger datasets)
      useWorker: false,
    
    
      // Optional, override default GeoTIFF function used to load source data
      // Oneof: fromUrl, fromBlob, fromArrayBuffer
      sourceFunction: fromArrayBuffer,
    
      // Only required if sourceFunction is GeoTIFF.fromArrayBuffer
      arrayBuffer: new ArrayBuffer(0),
    
      // The block size to use for buffer
      blockSize: 65536,
    
      // Optional, override default opacity of 1 on the image added to the map
      opacity: 1,
    
      // Optional, hide imagery while map is moving (may prevent 'flickering' in some browsers)
      clearBeforeMove: false,
    };
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public initService(): void {
    this.initMap();
    this.initServices();
  }

  private initMap(): void {
    this.map = new L.Map('map', {
      center: [47.64465747562069, -100.4549724697882],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initServices(): void {
    this.tiffService.currentTiff.subscribe((result) => {
      if(result){
        console.log(result)
        //LeafletGeotiff.leafletGeotiff(result?.source, geotiffOptions).addTo(this.map);
        this.options.arrayBuffer = result?.source;
        L.leafletGeotiff("", this.options).addTo(this.map);
      }
    })

  }
}
