import { Component, Input, OnInit } from '@angular/core';
import {single} from './../../model/single';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WheatherService } from 'src/app/services/wheather.service';
import { DeviceLocation } from 'src/app/model/DeviceLocation';
import { DailyForecasts } from 'src/app/model/dayForecast';


@Component({
  selector: 'app-chart-extented-forecast',
  templateUrl: './chart-extented-forecast.component.html',
  styleUrls: ['./chart-extented-forecast.component.scss']
})

export class ChartExtentedForecastComponent implements OnInit {

  @Input() chartSeries:any;

  single: any[] = [];
  single2: any[] = [];
  multi: [] = [];

  view :any= [300, 220];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  forecastArray:DailyForecasts[] = [];
  
  constructor(){
    /*let chartMax:chartSingle = new chartSingle();
    let chartMin:chartSingle = new chartSingle();
    location.deviceLocation$.subscribe(
        (l:DeviceLocation) =>
              {                
                if (l.cityKey.length > 2){                  
                  chartMax.name = "Maxima";
                  chartMin.name = "Minimas";
                  ws.get5DayWeather(l.cityKey).subscribe(
                    (w:any) =>{                      
                      let df:any = w.DailyForecasts;
                      df.forEach((day:any) => {
                        
                        let dayweek  = new Date(day.Date).toDateString();
                        let seriesMax:series = new series();
                        let seriesMin:series = new series();

                        seriesMax.name = dayweek;
                        seriesMax.value = day.Temperature.Maximum.Value;
                        seriesMin.name = dayweek;
                        seriesMin.value = day.Temperature.Minimum.Value;
                        
                        chartMax.series.push(seriesMax);
                        chartMin.series.push(seriesMin);
                      });                      
                    }
                );
                this.single2 = [];
                this.single.push(chartMax);
                this.single.push(chartMin);
                
                console.log("chartMax ", this.single);
                Object.assign(this, { single });
               }
               //Object.assign(chartMax, chartMin);
               
              }
    );*/
    
  }






  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
}


  ngOnInit(): void {
    console.log("init ", this.chartSeries);
  }

  onSelect(event:any) {
    console.log(event);
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