import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isdayligth$ = new BehaviorSubject<boolean>(false);

  apiKey:string = "1IAGJNpzTTYEtJCvvcQ2z3gHAg68tzNW";

  constructor() { }

  get isdayLigth$():Observable<boolean>{
      return this.isdayligth$.asObservable();
  }
  
  set isdayligth(isday:boolean){
      this.isdayligth$.next(isday);
  }


  

  public getApiKey():string {
    return this.apiKey;
  }


  /* formula para convertir Farenheit a Celcius
    (95 °F − 32) × 5/9 = 35 °C
  */
  public convertFarenheitToCelcius(far:number):number{
    return (far - 32) * 5/9;
  }


}
