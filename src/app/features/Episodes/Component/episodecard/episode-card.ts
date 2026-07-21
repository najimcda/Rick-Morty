import { Component, input } from '@angular/core';
import { Episodes } from '../../Type/episode.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-episode-card',
  imports: [NgClass],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.css',
})
export class EpisodeCard {
  episode = input.required<Episodes>();
}
