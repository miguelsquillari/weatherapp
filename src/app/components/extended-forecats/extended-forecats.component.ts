import { Component } from '@angular/core';
import { map, pipe } from 'rxjs';
import { DeviceLocation } from 'src/app/model/DeviceLocation';
import { DailyForecasts } from 'src/app/model/dayForecast';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WheatherService } from 'src/app/services/wheather.service';

@Component({
  selector: 'app-extended-forecats',
  templateUrl: './extended-forecats.component.html',
  styleUrls: ['./extended-forecats.component.scss']
})
export class ExtendedForecatsComponent {

  forecastArray:DailyForecasts[] = [];
//  forecastDayly:DailyForecasts = new DailyForecasts();

  constructor(private location:GeolocationService, private ws:WheatherService){
    location.deviceLocation$.subscribe(
        (l:DeviceLocation) =>
              {                
                if (l.cityKey.length > 2){
                  ws.get5DayWeather(l.cityKey).subscribe(
                    (w:any) =>{
                      //console.log("5 days " , w);
                      let df:any = w.DailyForecasts;
                      df.forEach((day:any) => {
                        let fc:DailyForecasts = new DailyForecasts();
                        fc.date = day.Date;
                        fc.dayMax = day.Temperature.Maximum.Value;
                        fc.dayMin = day.Temperature.Minimum.Value;
                        fc.icon = day.Day.Icon;
                        fc.iconPath = "assets/"+day.Day.Icon+"-s.png";
                        fc.iconPhrase = day.Day.IconPhrase;
                        this.forecastArray.push(fc);
                        //console.log("TEMP MAX", day.Temperature.Maximum.Value);
                      });
                      /*console.log(df[3].Temperature.Maximum.Value);
                      console.log(df[3].Temperature.Minimum.Value);
                      console.log(df[3].Temperature.Maximum.Unit);        
                      console.log(df[3].Date);                  */
                  }
                );
               }
              }
    )
    //console.log("array ", this.forecastArray);
  }

  public getForeCast(): DailyForecasts[]{
    return this.forecastArray;
  }
        
}
