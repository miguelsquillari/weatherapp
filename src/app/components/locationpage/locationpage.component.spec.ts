import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationpageComponent } from './locationpage.component';

describe('LocationpageComponent', () => {
  let component: LocationpageComponent;
  let fixture: ComponentFixture<LocationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
