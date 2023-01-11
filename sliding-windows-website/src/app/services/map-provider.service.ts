import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { TiffService } from './tiff.service';
import { fromArrayBuffer } from 'geotiff';

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {

  private map!: L.Map;
  private currTiffLayer!: L.Layer | null;

  constructor(private tiffService: TiffService) {
  
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
    this.tiffService.processedTiff.subscribe((result) => {
      if(result){
        console.log(result)
        //LeafletGeotiff.leafletGeotiff(result?.source, geotiffOptions).addTo(this.map);
        //this.options.arrayBuffer = result?.source;
      }
    })

  }
}
