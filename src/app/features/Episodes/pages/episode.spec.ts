import { ComponentFixture, TestBed } from '@angular/core/testing';

import { episode } from './episode';
import { Episodes } from '../Type/episode.type';

describe('Episode', () => {
  let component: episode;
  let fixture: ComponentFixture<episode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [episode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(episode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
