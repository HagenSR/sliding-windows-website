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
import { SearchComponent } from './components/left-div/components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { SearchResultComponent } from './components/left-div/components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LeftDivComponent,
    FileUploadComponent,
    FileDownloadComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule, 
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
