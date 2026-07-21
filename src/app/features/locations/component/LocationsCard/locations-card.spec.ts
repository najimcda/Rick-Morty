import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsCard } from './locations-card';

describe('Locations', () => {
  let component: LocationsCard;
  let fixture: ComponentFixture<LocationsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Location]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
