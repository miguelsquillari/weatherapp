import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { icon, Marker } from 'leaflet';


@Component({
  selector: 'app-locationpage',
  templateUrl: './locationpage.component.html',
  styleUrls: ['./locationpage.component.scss']
})
export class LocationpageComponent implements OnInit{

  private map:any;
  public lat:number =0;
  private lng:number =0;

  constructor(private locationService:GeolocationService){}

  ngOnInit() {    
    L.Icon.Default.imagePath = "assets/leaflet/";
    this.locationService.deviceLocation$.subscribe(
        (pos) =>{
          this.lat = pos.latitud;
          this.lng = pos.longitud;
          this.initMap();
        }
    );

    
  }


  protected initMap(){
    this.map = L.map('map', {
      center: [this.lat,this.lng],
      zoom: 13
    });    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 16,
    }).addTo(this.map);
  
    L.marker([this.lat,this.lng]).addTo(this.map)
    .bindPopup('you are here .<br> Yes !!')
    .openPopup();
  } 

}
