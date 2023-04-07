import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CurrentwheatherComponent } from './components/currentwheather/currentwheather.component';
import { LocationpageComponent } from './components/locationpage/locationpage.component';
import { MainComponent } from './components/main/main.component';
import { ClockComponent } from './components/time/clock/clock.component';

const routes: Routes = [
  { path: '', component: CurrentwheatherComponent },
  { path: 'about', component: AboutComponent },
  { path: 'clock', component: ClockComponent},
  { path: 'location', component: LocationpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
