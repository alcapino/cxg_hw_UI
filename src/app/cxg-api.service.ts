import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from './city';
import { CityDetail } from './citydetail';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CxgApiService {
  private cxgAPIUrl = environment.backendURL;
  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cxgAPIUrl+"city/").pipe(
      tap(cities => {
        this.log('fetched cities');
      }),
      catchError(this.handleError('getCities', []))
    );
  }

  getCityDetail(cname): Observable<CityDetail[]> {
    return this.http.get<CityDetail[]>(this.cxgAPIUrl+"weather/"+cname+"/").pipe(
      tap(citydetail => {
        this.log('fetched citydetail '+cname);
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
