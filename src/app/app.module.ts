import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapkey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
