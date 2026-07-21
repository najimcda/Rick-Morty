import { Component, OnInit, signal, inject } from '@angular/core';
import { Episodes } from '../Type/episode.type';
import { EpisodeCard } from '../Component/episodecard/episode-card';
import { EpisodeService } from '../services/episode';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';
import { Pagination } from '../Component/pagination/pagination';

@Component({
  selector: 'app-episode',
  imports: [Pagination, EpisodeCard],
  templateUrl: './episode.html',
  styleUrl: './episode.css',
})
export class episode implements OnInit {
  private readonly episodeService = inject(EpisodeService);
  readonly episode = this.episodeService.episodeSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.episodeService.getEpisodeFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadEpisode();
  }

  loadEpisode(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.episodeService
      .getEpisodeFromComponent()
      .subscribe((response: ApiResponse<Episodes[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.episodeService.getEpisodeFromService(page).subscribe();
  }
}
