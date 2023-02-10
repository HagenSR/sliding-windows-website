import { Component, OnInit } from '@angular/core';
import { TiffMetaData } from 'src/app/models/tiff_meta_data';
import { MapProviderService } from 'src/app/services/map-provider.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public tiffMetaData : TiffMetaData[] = []

  constructor(private mapService: MapProviderService, private searchService : SearchService) { 
    this.searchService.TiffData.subscribe((res) => {
      this.tiffMetaData = res;
    })

  }

  ngOnInit(): void {
  }

  search(){
    let bounds = this.mapService.getBounds()
    this.searchService.searchArea(bounds)

  }

}
