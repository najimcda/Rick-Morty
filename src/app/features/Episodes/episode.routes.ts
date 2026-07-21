import type { Route } from '@angular/router';
import { episode } from '../Episodes/pages/episode'

export const EPISODE_ROUTES: Route[] = [
  {
    path: '',
    component: episode,
  },
];
