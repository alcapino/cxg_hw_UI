import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityDetail } from '../citydetail';
// import { CITIES } from '../mock-cities';
import { CxgApiService} from '../cxg-api.service';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  selectedCity: City
  cities: City;
  citydetail: CityDetail;
  /*city: City = {
    "id": 1701668,
    "name": "Manila"
  }*/

  constructor( private cxgapi: CxgApiService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    //this.cities = this.cxgapi.getCities();
    this.cxgapi.getCities()
      .subscribe(cities => this.cities = JSON.parse(cities));
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

}
