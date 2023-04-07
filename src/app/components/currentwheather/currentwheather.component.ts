import { Component, HostListener } from '@angular/core';
import { DeviceLocation } from 'src/app/model/DeviceLocation';
import { CommonService } from 'src/app/services/common.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WheatherService } from 'src/app/services/wheather.service';

@Component({
  selector: 'app-currentwheather',
  templateUrl: './currentwheather.component.html',
  styleUrls: ['./currentwheather.component.scss']
})
export class CurrentwheatherComponent {

  protected currentTemp:string ="0.0";
  protected dayMin:string = "0";
  protected dayMax:string = "0";
  protected WeatherIcon:string = "0";
  protected WeatherIconPhrase:string = "";
  protected curDate:Date | undefined;
  protected deviceLocation:DeviceLocation = new DeviceLocation();
  protected curCityKey = "0";
  protected extendedForecastDet:boolean = true;
  protected btnText = "Details Off";
  chartSeries: any[] = [];

  constructor(private wheather:WheatherService, private util:CommonService, private location:GeolocationService){
    this.curDate = new Date(Date.now());
    this.location.deviceLocation$.subscribe(
      (d:DeviceLocation)=> { 
        this.deviceLocation = d; 
        this.curCityKey = d.cityKey;
        if (this.curCityKey.length > 2){
          this.getCurrentWeather();
          this.get1DayWeather();
          this.get5DayWeather();
        }
      }
    );
  }


  details(event$:any){
      if (this.extendedForecastDet){
        this.extendedForecastDet = false;
        this.btnText = "Details Off";
      }else{
        this.extendedForecastDet = true;
        this.btnText = "Details On";
      }
  }

  @HostListener('document:visibilitychange', ['$event']) visibilitychange() {    
    if (!document.hidden){
      this.getCurrentWeather();
    }
  }


  isd:boolean  =true;
  public getCurrentWeather(){
    //console.log("Actualizando ... " , new Date(Date.now()).toLocaleString());
    this.wheather.getCurrentWeather(this.curCityKey).subscribe(
      {
      next: (w:any) => {
       // console.log("CURRENT WEATHER ",w)      
        this.WeatherIcon = "assets/"+w[0].WeatherIcon+"-s.png";
        this.currentTemp = w[0].Temperature.Value;
        this.WeatherIconPhrase = w[0].IconPhrase;        
        this.util.isdayligth$.next(w[0].IsDaylight);
        
        /*
        console.log("HasPrecipitation",w[0].HasPrecipitation);
        console.log("RainProbability",w[0].RainProbability);
        console.log("ThunderstormProbability",w[0].ThunderstormProbability);
        console.log("IceProbability",w[0].IceProbability);
        */

      },error: (e) =>{
        console.log("error:: ", e)
      },complete() {
        console.log("completo ..");
      },  
    }
    );
  }


  public get1DayWeather(){
    console.log("Actualizando 1 day weather ... " , new Date(Date.now()).toLocaleString());
    this.wheather.get1DayWeather(this.curCityKey).subscribe({
      next: (w:any) => {
        console.log(w)        
        console.log("1 day weather ..");
         console.log(w);
         this.dayMax = w.DailyForecasts[0].Temperature.Maximum.Value;
         this.dayMin = w.DailyForecasts[0].Temperature.Minimum.Value;
      },error: (e) =>{
        console.log("error:: ", e)
      }    
    }
    );
  }


  public get5DayWeather(){
    console.log("*** Actualizando 5 day weather ... " , new Date(Date.now()).toLocaleString());

    let chartMax:chartSingle = new chartSingle();
    let chartMin:chartSingle = new chartSingle();
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    this.wheather.get5DayWeather(this.curCityKey).subscribe({
      next: (w:any) => {
        let df:any = w.DailyForecasts;
        console.log("5 days ", w);
                df.forEach((day:any) => {
                        
                let dayweek  =  weekday[new Date(day.Date).getDay()];
                let seriesMax:series = new series();
                let seriesMin:series = new series();

                seriesMax.name = dayweek;
                seriesMax.value = day.Temperature.Maximum.Value;
                seriesMin.name = dayweek;
                seriesMin.value = day.Temperature.Minimum.Value;
                        
                chartMax.series.push(seriesMax);
                chartMin.series.push(seriesMin);
          });  
          this.chartSeries.push(chartMax);                    
          this.chartSeries.push(chartMin);     
      },error: (e) =>{
        console.log("error:: ", e)
      }    
    });
  }
}

export class chartSingle{
  name: string = "";
  series:series[]   = [];
}

export class series{
      name: string = "";
      value:number = 0;    
}