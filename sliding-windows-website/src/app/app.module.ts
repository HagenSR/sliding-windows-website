import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LeftDivComponent } from './components/left-div/left-div.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LeftDivComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
