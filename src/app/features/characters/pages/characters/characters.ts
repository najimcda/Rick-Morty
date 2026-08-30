import { Component, OnInit, signal, inject } from '@angular/core';
import { Character } from '../../types/character.type';
import { CharacterCard } from '../../components/character-card/character-card';
import { CharactersService, CharacterFilters } from '../../services/characters';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, Pagination],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private readonly characterService = inject(CharactersService);
  readonly characters = this.characterService.characterSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);
  filters = signal<CharacterFilters>({});

  readonly statusOptions = ['alive', 'dead', 'unknown'];
  readonly genderOptions = ['female', 'male', 'genderless', 'unknown'];
  readonly speciesOptions = [
    'Human', 'Alien', 'Humanoid', 'Robot', 'Animal',
    'Mythological Creature', 'Cronenberg', 'Disease', 'unknown',
  ];

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    this.currentPage.set(page);

    this.characterService
      .getCharacters(page, this.filters())
      .subscribe((response: ApiResponse<Character[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.loadCharacters(page);
  }

  onFilterChange(key: keyof CharacterFilters, value: string) {
    this.filters.update((f) => ({ ...f, [key]: value || undefined }));
    this.loadCharacters(1);
  }

  resetFilters() {
    this.filters.set({});
    this.loadCharacters(1);
  }
}
