import { Component, OnInit } from '@angular/core';
import { MapProviderService } from 'src/app/services/map-provider.service';
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private tiffService: TiffService, private mapService: MapProviderService) {
    tiffService.retrieveTiff(1)
  }

  ngOnInit(): void {
    this.mapService.initService();
  }

}
