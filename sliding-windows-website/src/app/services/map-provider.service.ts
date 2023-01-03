import { Injectable } from '@angular/core';
import { Map, Layer, CircleMarker, tileLayer, GeoJSON, geoJSON, LatLng, LayerGroup } from 'leaflet';
import { TiffService } from './tiff.service';
// import * as leafletGeotiff from 'leaflet-geotiff';
import geotiffOptions from './geotiff-options';
// import * as plotty from 'leaflet-geotiff/leaflet-geotiff-plotty';

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {

  private map!: Map;
  private currTiffLayer!: Layer | null;

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
    this.map = new Map('map', {
      center: [47.64465747562069, -100.4549724697882],
      zoom: 7
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initServices(): void {
    this.tiffService.currentTiff.subscribe((result) => {
      if(result){
        // var layer = leafletGeotiff(result?.source, geotiffOptions).addTo(this.map);
      }
    })

  }
}
