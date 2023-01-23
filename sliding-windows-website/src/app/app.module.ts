import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LeftDivComponent } from './components/left-div/left-div.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/left-div/components/file-upload/file-upload.component';
import { FileDownloadComponent } from './components/left-div/components/file-download/file-download.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LeftDivComponent,
    FileUploadComponent,
    FileDownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
