import { Component } from '@angular/core';
import { DeviceLocation } from 'src/app/model/DeviceLocation';
import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  devlocation:DeviceLocation | undefined;

  constructor(private location:GeolocationService){
    console.log("local ? ", this.getCityKeyLocalStorage());
    if (this.getCityKeyLocalStorage()?.length == 1){
        this.location.getCityNameByLocationCoords();
        this.setLocation();
      }else{

      }
  }


  public setLocation(){
    this.location.deviceLocation$.subscribe(
       (loc)=>{
        //console.log("location :: ", loc);        
        this.devlocation = loc;
        this.saveLocalStorage(loc.cityKey);
      }
    );
  }

  private getCityKeyLocalStorage(){
    return localStorage.getItem("citykey") ? null : "0";
  }


  private saveLocalStorage(key:string){
    localStorage.setItem("citykey", key);
  }

}
