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
    windowSize: new FormControl<number | null>(null, [
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


  onSubmit() {
    if (this.fileUploadForm.invalid) {
      alert("Cannot insert invalid data. Please read the advice below of the input boxes")
    } else {
      let tiff_file = this.fileUploadForm.get("file")!.value!;
      let win_size = this.fileUploadForm.get("windowSize")!.value!;
      let op = this.fileUploadForm.get("operation")!.value!;
      let dtype = this.fileUploadForm.get("dtype")!.value!;
      this.tiffService.checkIfTiffExists(tiff_file, win_size, op, dtype).then((res) => {
        if (res) {
          this.tiffService.getTiffMeta(res)
        } else {
          this.tiffService.insertTiff(tiff_file, win_size, op, dtype)
            .then((res) => { })
        }
      })
    }
  }




}
