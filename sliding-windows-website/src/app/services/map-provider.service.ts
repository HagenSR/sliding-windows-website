import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { TiffService } from './tiff.service';
import 'sean-leaflet-geotiff-2'
import { environment } from 'src/environments/environment';

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
    this.tiffService.tiffMetaData.subscribe((res) => {
      if (res) {
        let url = environment.ApiURL + 'retrieve_tiff?img_id=' + res.tiff_image_id;
        let newLayer = L.leafletGeotiff(url!, {
          renderer: L.LeafletGeotiff.plotty({
            displayMin: 0,
            displayMax: 256,
            colorScale: "greens",
            useWorker: true
          })
        });
        if(this.currTiffLayer){
          this.map.removeLayer(this.currTiffLayer)
        }
        this.map.addLayer(newLayer)
        this.currTiffLayer = newLayer
        let layer = L.geoJSON()
        layer.addData(res.bounding_box)
        this.map.fitBounds(layer.getBounds())
      }
      
    })
  }

  getBounds() : L.LatLngBounds{
    return this.map.getBounds()
  }

}
