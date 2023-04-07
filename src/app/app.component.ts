import { Component, HostListener } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  backgroundClass = ['backgroundAppSunnyDay','backgroundAppNigth'];
  selectedbackground = "backgroundAppDefault";
  

  title = 'MSQuillari - Weather App';
  
  constructor(private util:CommonService){
    this.setBackground();
  }

  setBackground(){
    this.util.isdayLigth$.subscribe(
      (p) =>{
          if (p){
            this.selectedbackground = this.backgroundClass[0];
          }else{
            this.selectedbackground = this.backgroundClass[1];
          }
      }
    );
    //console.log("selected back ", this.selectedbackground);
  }




}
