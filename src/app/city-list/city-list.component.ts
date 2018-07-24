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
  selectedCity: City;
  cities: City[];
  citydetail: CityDetail;
  /*city: City = {
    "id": 1701668,
    "name": "Manila"
  }*/
  lat: number = environment.mapapi.lat;
  lng: number = environment.mapapi.lng;
  zoom: number = environment.mapapi.zoom;

  constructor( private cxgapi: CxgApiService) { }

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
    //this.selectedCity = city;
    this.getCityDetail(city.name);
    //console.log(city.name);
  }

  onMarkerClick(city: City): void {
    // do the zoom zoom
    this.getCityDetail(city.name);
    console.log("ano daw? "+city.name);
  }

}
