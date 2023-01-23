import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from 'src/app/models/operation';
import { OperationsService } from 'src/app/services/operations.service';
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


  fileUploadForm = new FormGroup({
    file: new FormControl<File | null>(null, [
      Validators.required,
    ]),
    windowSize: new FormControl<number | null>(null,[
      Validators.required,
      Validators.min(1)
    ]),
    operation: new FormControl<number | null>(null, [Validators.required]),
    dtype: new FormControl<string>('int8', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, public operationService: OperationsService, public tiffService: TiffService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileUploadForm.controls.file.setValue(file);
    }
  }

  // On file Select
  // onChange(event : any) {
  //   this.file = event.target.files[0];
  // }

  onSubmit() {
    if (this.fileUploadForm.invalid) {
      alert("Cannot insert invalid data. Please read the advice below of the input boxes")
    } else {
      if (!window.confirm("Are you sure you want to submit? This cannot be undone")) {
        return
      }
      this.tiffService.insertTiff(this.fileUploadForm.get("file")!.value!, this.fileUploadForm.get("windowSize")!.value!,
        this.fileUploadForm.get("operation")!.value!, this.fileUploadForm.get("dtype")!.value!).then(res => console.log(this.tiffService.tiffMetaData.value))
    }
  }




}
