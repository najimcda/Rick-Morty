import type { Route } from '@angular/router';
import { locations } from './pages/locations/locations';

export const LOCATIONS_ROUTES: Route[] = [
  {
    path: '',
    component: locations,
  },
];
