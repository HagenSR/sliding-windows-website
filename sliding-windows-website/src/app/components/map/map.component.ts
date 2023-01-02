import { Component, OnInit } from '@angular/core';
import { GeoTIFF } from "geotiff";
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private tiffService: TiffService) {
    tiffService.retrieveTiff("\\x106da94ee93d729428243fccbbd8df2f613ef8e0ef5d3f9f5282fa999d844788")
  }
  
  ngOnInit(): void {
  }

}
