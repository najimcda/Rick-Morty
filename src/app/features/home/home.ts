import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatsService } from './statsService';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  statsService = inject(StatsService);
}
