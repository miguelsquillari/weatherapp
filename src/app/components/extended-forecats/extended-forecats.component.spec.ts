import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedForecatsComponent } from './extended-forecats.component';

describe('ExtendedForecatsComponent', () => {
  let component: ExtendedForecatsComponent;
  let fixture: ComponentFixture<ExtendedForecatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedForecatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendedForecatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
