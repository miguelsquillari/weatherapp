import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CurrentwheatherComponent } from './components/currentwheather/currentwheather.component';
import { AboutComponent } from './components/about/about.component';
import { LocationComponent } from './components/location/location.component';
import { ExtendedForecatsComponent } from './components/extended-forecats/extended-forecats.component';
import { ClockComponent } from './components/time/clock/clock.component';
import { LocationpageComponent } from './components/locationpage/locationpage.component';
import { MenuComponent } from './components/menu/menu.component';
import { fadeAnimation } from './animations/fadeAnimation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartExtentedForecastComponent } from './components/chart-extented-forecast/chart-extented-forecast.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CurrentwheatherComponent,
    AboutComponent,
    LocationComponent,
    ExtendedForecatsComponent,
    ClockComponent,
    LocationpageComponent,
    MenuComponent,
    ChartExtentedForecastComponent,
    
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule, HttpClientModule, NgxChartsModule
  ],
  providers: [
    //fadeAnimation
  ],
  //animations: [fadeAnimation],
  bootstrap: [AppComponent]
})
export class AppModule { }
