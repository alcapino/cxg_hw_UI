import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from './city';
import { CityDetail } from './citydetail';
//import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CxgApiService {
  private weatherapiUrl = "http://api.openweathermap.org/data/2.5/weather?appid=7c28321f513df745eed19148f4f6ce55&units=metric";
  private cxgAPIUrl = 'http://127.0.0.1:8000/';
  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cxgAPIUrl+"city/").pipe(
      tap(cities => {
        console.log(cities);
        this.log('fetched cities');
      }),
      catchError(this.handleError('getCities', []))
    );
  }

  getCityDetail(cname): Observable<CityDetail[]> {
    return this.http.get<CityDetail[]>(this.cxgAPIUrl+"weather/"+cname+"/").pipe(
      tap(citydetail => {
        console.log(citydetail);
        this.log('fetched citydetail'+cname);
      }),
      catchError(this.handleError('getCityDetail', []))
    );
  }

  private log(message: string) {
    console.log("LOG: "+message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) { }
}
