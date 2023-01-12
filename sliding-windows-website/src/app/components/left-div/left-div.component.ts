import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from 'src/app/models/operation';
import { OperationsService } from 'src/app/services/operations.service';
import { TiffService } from 'src/app/services/tiff.service';

@Component({
  selector: 'app-left-div',
  templateUrl: './left-div.component.html',
  styleUrls: ['./left-div.component.css']
})
export class LeftDivComponent implements OnInit {
  fileUploadForm = new FormGroup({
    file: new FormControl('', [
      Validators.required,
    ]),
    windowSize: new FormControl(1),
    operation: new FormControl(1, Validators.required),
    dtype: new FormControl('int8', Validators.required)
  });
  selected: Operation | undefined;

  constructor(private formBuilder: FormBuilder, public operationService: OperationsService, public tiffService: TiffService) { }

  ngOnInit(): void {
  }

  update(e: any) {
    this.selected = e.target.value
  }

  // On file Select
  // onChange(event : any) {
  //   this.file = event.target.files[0];
  // }

  onSubmit() {
    if (this.fileUploadForm.invalid) {
      alert("Cannot insert invalid data. Please read the advice to the left of the input boxes")
    } else {
      if (!window.confirm("Are you sure you want to submit? This cannot be undone")) {
        return
      }
      this.tiffService.insertTiff(this.fileUploadForm.get("file")!.value, this.fileUploadForm.get("windowSize")!.value!,
        this.fileUploadForm.get("operation")!.value!, this.fileUploadForm.get("dtype")!.value!).then(res => console.log(this.tiffService.tiffMetaData.value))
    }
  }



}
