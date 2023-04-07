import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentwheatherComponent } from './currentwheather.component';

describe('CurrentwheatherComponent', () => {
  let component: CurrentwheatherComponent;
  let fixture: ComponentFixture<CurrentwheatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentwheatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentwheatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
