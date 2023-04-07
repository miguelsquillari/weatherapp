import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartExtentedForecastComponent } from './chart-extented-forecast.component';

describe('ChartExtentedForecastComponent', () => {
  let component: ChartExtentedForecastComponent;
  let fixture: ComponentFixture<ChartExtentedForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartExtentedForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartExtentedForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
