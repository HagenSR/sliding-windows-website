import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { TiffService } from './tiff.service';
import { fromArrayBuffer } from 'geotiff';
import { ScriptService } from './script.service';

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {

  private map!: L.Map;
  private currTiffLayer!: L.Layer | null;

  constructor(private tiffService: TiffService, private scriptService: ScriptService) {

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public initService(): void {
    this.initMap();
    this.initScripts();
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

  private initScripts() {
    this.scriptService.load('leaflet-geotiff').then(data => {
      this.scriptService.load("leaflet-geotiff-plotty").then((res) => {
        this.initServices();

      })

    }).catch(error => console.log(error));

  }

  private initServices(): void {
    this.tiffService.url.subscribe((res) => {
      L.leafletGeotiff(res!, {
        renderer: L.LeafletGeotiff.plotty({
          arrowSize: 20
        })
      }).addTo(this.map);
      this.tiffService.processedTiff.value?.getImage(0).then((res) => {
        let bounds = res.getBoundingBox()
        let ltlng: L.LatLngBoundsExpression = [[bounds[1], bounds[0]], [bounds[3], bounds[2]]]
        this.map.fitBounds(ltlng)
      })
    })
  }
}
