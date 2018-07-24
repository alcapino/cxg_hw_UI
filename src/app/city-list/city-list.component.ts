import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityDetail } from '../citydetail';
// import { CITIES } from '../mock-cities';
import { environment } from '../../environments/environment';
import { CxgApiService} from '../cxg-api.service';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  protected map: any;
  selectedCity: City;
  cities: City[];
  citydetail: CityDetail;
  lat: number = environment.mapapi.lat;
  lng: number = environment.mapapi.lng;
  zoom: number = environment.mapapi.zoom;

  constructor( private cxgapi: CxgApiService) { }

  protected mapReady(map) {
    this.map = map;
  }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    //this.cities = this.cxgapi.getCities();
    this.cxgapi.getCities()
      .subscribe(cities => this.cities = cities);
  }

  getCityDetail(cname): void {
    this.cxgapi.getCityDetail(cname)
      .subscribe(citydetail => this.citydetail = citydetail);
  }

  onSelect(city: City): void {
    this.projectCity(city);
  }

  onMarkerClick(city: City): void {
    this.projectCity(city);
  }

  projectCity(city): void {
    if (this.map){
      this.map.setCenter({ lat: city.coord.lat, lng: city.coord.lon });
      this.map.setZoom(12);
    }
    //console.log('clicked', city, { lat: city.coord.lat, lng: city.coord.lon });
    this.getCityDetail(city.name)
  }

  resetMap(): void {
    if (this.map){
      this.map.setCenter({ lat: this.lat, lng: this.lng });
      this.map.setZoom(this.zoom);
    }
  }

}
