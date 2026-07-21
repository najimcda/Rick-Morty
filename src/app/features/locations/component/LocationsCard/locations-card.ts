import { Component, input } from '@angular/core';
import { Locations } from '../../type/locations';
import { NgClass } from '@angular/common';
import { Character } from '../../../characters/types/character.type';

@Component({
  selector: 'app-locations-card',
  imports: [NgClass],
  templateUrl: './locations-card.html',
  styleUrl: './locations-card.css',
})
export class LocationsCard {
location = input.required<Locations>();
}

import { LocationWithResidents } from '../../service/locations-service';