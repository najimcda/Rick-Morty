import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

export interface Stats {
  charactersCount: number;
  locationsCount: number;
  episodesCount: number;
}

interface ApiResponse {
  info: {
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private http = inject(HttpClient);

  // Le signal qui contient les compteurs
  public stats = signal<Stats>({
    charactersCount: 0,
    locationsCount: 0,
    episodesCount: 0
  });

  // Fonction pour aller chercher les chiffres sur l'API Rick et Morty
  loadStats() {
    forkJoin({
      characters: this.http.get<ApiResponse>('https://rickandmortyapi.com/api/character'),
      locations: this.http.get<ApiResponse>('https://rickandmortyapi.com/api/location'),
      episodes: this.http.get<ApiResponse>('https://rickandmortyapi.com/api/episode')
    }).subscribe({
      next: ({ characters, locations, episodes }) => {
        this.stats.set({
          charactersCount: characters.info.count,
          locationsCount: locations.info.count,
          episodesCount: episodes.info.count
        });
      },
      error: (err) => console.error('Erreur chargement stats', err)
    });
  }
}