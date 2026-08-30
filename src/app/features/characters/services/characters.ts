import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of} from 'rxjs';
import { Character } from '../types/character.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

export interface CharacterFilters {
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';

  getCharacters(
    page: number = 1,
    filters: CharacterFilters = {}
  ): Observable<ApiResponse<Character[]>> {
    let params = new HttpParams().set('page', page);

    if (filters.status) params = params.set('status', filters.status);
    if (filters.species) params = params.set('species', filters.species);
    if (filters.gender) params = params.set('gender', filters.gender);
    if (filters.name) params = params.set('name', filters.name);

    return this.http.get<ApiResponse<Character[]>>(this.url, { params }).pipe(
      tap((response) => this.characters.set(response.results)),
      catchError(() => {
        this.characters.set([]);
        return of({
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        } as ApiResponse<Character[]>);
      })
    );
  }
}
