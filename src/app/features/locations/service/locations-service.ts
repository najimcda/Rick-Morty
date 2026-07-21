import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Locations } from '../type/locations';
import { ApiResponse } from '../../../shared/types/api-response.types';
import { Character } from '../../characters/types/character.type';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);
  private locations = signal<Locations[]>([]);
  readonly locationSignal = this.locations.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/location/';

  getLocationFromService(page: number = 1): Observable<ApiResponse<Locations[]>> {
    return this.http
      .get<ApiResponse<Locations[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Locations[]>) => this.locations.set(response.results)));
  }

  getLocationFromComponent(page: number = 1): Observable<ApiResponse<Locations[]>> {
    return this.http.get<ApiResponse<Locations[]>>(this.url, {
      params: { page: page },
    });
  }
}
