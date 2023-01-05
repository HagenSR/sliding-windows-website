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
    tiffService.retrieveTiff("\\x033aaf3eaa13d83123a48ebe11558e38234592e214ee1c83bab74775e7374d54")

  }

  ngOnInit(): void {
    this.mapService.initService();
  }

}
