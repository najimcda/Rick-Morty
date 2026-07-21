import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Episodes } from '../Type/episode.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private readonly http = inject(HttpClient);
  private episode = signal<Episodes[]>([]);
  readonly episodeSignal = this.episode.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/episode';

  getEpisodeFromService(page: number = 1): Observable<ApiResponse<Episodes[]>> {
    return this.http
      .get<ApiResponse<Episodes[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Episodes[]>) => this.episode.set(response.results)));
  }

  getEpisodeFromComponent(page: number = 1): Observable<ApiResponse<Episodes[]>> {
    return this.http.get<ApiResponse<Episodes[]>>(this.url, {
      params: { page: page },
    });
  }
}
