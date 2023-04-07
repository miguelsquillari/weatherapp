import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class WheatherService {

  constructor(private http:HttpClient, private common:CommonService) { }



  /**
   * Get the current wheather
   * 1 hour
   * @param locationKey 
   * @returns 
   */
  getCurrentWeather(locationKey:string){
    let p = new HttpParams()
    .set('apikey', this.common.apiKey)
    .set('languaje', "es-ar")
    .set('details', "true")
    .set('metric', "true");

    const url ="https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/"+locationKey;
    
    return this.http.get(url, {params:p})

  }


  get1DayWeather(locationKey:string){
    let p = new HttpParams()
    .set('apikey', this.common.apiKey)
    .set('languaje', "es-ar")
    .set('details', "true")
    .set('metric', "true");

    const url ="https://dataservice.accuweather.com/forecasts/v1/daily/1day/"+locationKey;
    
    return this.http.get(url, {params:p})

  }


  get5DayWeather(locationKey:string){
    let p = new HttpParams()
    .set('apikey', this.common.apiKey)
    .set('languaje', "es-ar")
    .set('details', "true")
    .set('metric', "true");

    const url ="https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+locationKey;
    
    return this.http.get(url, {params:p})

  }

}
