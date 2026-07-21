import { Component, OnInit, signal, inject } from '@angular/core';
import { Locations } from '../../type/locations';
import { LocationsCard } from '../../component/LocationsCard/locations-card';
import { LocationService } from '../../service/locations-service';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../component/pagination/pagination';

@Component({
  selector: 'app-locations',
  imports: [Pagination, LocationsCard],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class locations implements OnInit {
  private readonly locationService = inject(LocationService);
  readonly locations = this.locationService.locationSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.locationService.getLocationFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadLocation();
  }

  loadLocation(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.locationService
      .getLocationFromComponent()
      .subscribe((response: ApiResponse<Locations[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.locationService.getLocationFromService(page).subscribe();
  }
}
