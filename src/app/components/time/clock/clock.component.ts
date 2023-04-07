import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {

  clock:Date | undefined;

  constructor(){
    this.clock = new Date();
  }

  clocks = setInterval(() => {
    this.clock = new Date();
  }, 1000);

}
