import { Component, Input, OnInit } from '@angular/core';
import { TiffMetaData } from 'src/app/models/tiff_meta_data';
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input()
  metaData!: TiffMetaData;

  constructor(private tiffService : TiffService) { }

  ngOnInit(): void {
  }

  setResult(){
    this.tiffService.tiffMetaData.next(this.metaData);
  }

}
