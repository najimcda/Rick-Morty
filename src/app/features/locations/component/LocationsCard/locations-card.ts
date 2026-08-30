import { Component, input } from '@angular/core';
import { Locations } from '../../type/locations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-locations-card',
  imports: [NgClass],
  templateUrl: './locations-card.html',
  styleUrl: './locations-card.css',
})
export class LocationsCard {
  location = input.required<Locations>();
}