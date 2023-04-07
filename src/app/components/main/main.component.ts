import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  active:string[] = ["active", "", "", ""];

  constructor(){
    
  }
  ngOnInit(): void {
    this.setMenuOption(0);
  }

  public setMenuOption(selectedMenu:number){
    this.active = [];
    this.active[selectedMenu] = "active";

  } 

  private cleanMenu(){
    this.active = [];
  }

}
