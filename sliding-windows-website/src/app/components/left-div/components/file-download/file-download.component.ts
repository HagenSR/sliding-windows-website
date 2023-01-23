import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  constructor(public tiffService : TiffService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  downloadFile(){
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      const blob = new Blob([this.tiffService.rawProcessedBlob.value!], { type: 'application/octet-stream' });
      var fileUrl = URL.createObjectURL(blob);
      link.setAttribute('href', fileUrl);
      link.setAttribute('download', this.tiffService.tiffMetaData.value?.file_name!);
      document.body.appendChild(link);
      link.click();
      link.remove();
  }

}
