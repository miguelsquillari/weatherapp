import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, tap, throwError } from 'rxjs';
import { DeviceLocation } from '../model/DeviceLocation';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})




export class GeolocationService {

  constructor(private http:HttpClient, private common:CommonService) { }

  private device_loc$ = new BehaviorSubject<DeviceLocation>(new DeviceLocation());

  public getCurrentLocation(){    
  }

  get deviceLocation$():Observable<DeviceLocation>{
    return this.device_loc$.asObservable();
  }


  set deviceLocation(deviceLocation:DeviceLocation){
    this.device_loc$.next(deviceLocation);
  }


  public getLocationCoords(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) =>{
            let lat1 = pos.coords.latitude;
            let lng1 = pos.coords.longitude;
            let p = new  HttpParams()
            .set('apikey',this.common.getApiKey())        
            .set('languaje', "es-ar")
            .set('details', "true")
            .set('q', lat1+","+lng1)
            .set('toplevel', "true");
            
          this.http.get("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",{params:p});  
          },error =>{
            console.log("error " , error);
          }          
        );
    }else{
      console.log("bad news");
    }      
  }
   //http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=1IAGJNpzTTYEtJCvvcQ2z3gHAg68tzNW&q=-31.4015613,-64.1833276&language=es-ar&details=true&toplevel=false

  public getCityNameByLocationCoords(){
    let resp:any;
    this.getCurrentLocation2().subscribe(
      (pos:any) =>{
        
      let p = new  HttpParams()
        .set('apikey',this.common.getApiKey())        
        .set('languaje', "es-ar")
        .set('details', "true")
        .set('q', pos.latitude+","+pos.longitude)
        .set('toplevel', "true");
        
      resp = this.http.get("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",{params:p}).subscribe(
        (R:any) =>{
         // console.log("REspuesta ", R);
          let d = new DeviceLocation();
          d.city = R.LocalizedName;
          d.cityKey = R.Key;
          d.country = R.Country.LocalizedName;
          d.latitud = pos.latitude;
          d.longitud = pos.longitude;
          //this.deviceLocation(d);
          this.device_loc$.next(d);
        }
      );    
    },error =>{
      console.log("Error al leer la geolocalizacion del mobil", error);
      let d = new DeviceLocation();
          d.city = "Sin acceso a Gelocalizacion";
          d.cityKey = "0";
          d.country = "";
          //this.deviceLocation(d);
          this.device_loc$.next(d);
    }
    ) ;    
  }


  public getCurrentLocation2() {
    // GeolocationCoordinates is global interface
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          // Observable will call the Observer’s next(value) method to provide data.
          observer.next(position.coords);
          // observer.complete() marks the observable as done. It means we can no longer emit any more values out of this observable
          observer.complete();
        },
        // observer.error puts observable into an error state. It means we can no longer emit any more values out of this observable
        (err) => observer.error(err)
      );
    }).pipe(
      // When retry receives the error, it will resubscribe to that observable with the same kind of pipe. In rxjs, all observables are cold and unicast. That means whenever we subscribe to an observable, all the logic inside there is going to be executed right away. When retry operator resubscribes to this observable, that really means, all the source observable code re executes, because we are adding a second subcription to it. It does not somehow just magically get that logic to rerun. it actually resubscribes to that observable.
      // the argument to retry is an integer. `retry(1)` it is the number of times you want to retry your logic or really resubscribe. if you do not provide a number, and then it is going to try to resubscribe an infinite number of times.
      retry(1), // OPTIONAL
      // "TAP" generally used for notification or logging system. tap executes if the observable emits value which will be the first arg of tab. if it emits error, second arg of "tab" will run
      // the second argument is a function that gets called any time an error comes out
      // third argument can be a function that will be invoked any time the observable is marked as complete

      tap(
        () => {
          console.log("i Got your location");
          // create a notification service or console.log it
          //this.notificationsService.addSuccess('Got your location');
        }
        // instead of this, use catchError which returns an observable
        // (err) => {
        //   this.notificationsService.addError('failed to get your location');
        // }
      ),
      // it will be invoked if our source observable emits an error.
      catchError((error) => {
        // inside here we always two different things
        // 1st handle the error
        //this.notificationsService.addError('failed to get your location');
        // #2 return a new observable. that is the requirement of catchError operator
        // why do we return a new observable. that's the reason is why we want to use the catch operator instead of second arg to the tap function.
        // if we cannot fetch anything, we could show a default location
        // or we want to pass the error to the rest of the pipeline.

        return (error);
      })
    );
  }

  
}
