import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, shareReplay, switchMap, timer } from 'rxjs';
import { Currency } from '../interface/currency';

@Injectable({
  providedIn: 'root'
})
export class ConversorApiService {

  private url: string = 'https://economia.awesomeapi.com.br/last/';
  private currencyData$: Observable<Currency[]> | undefined;
  private loading = false;

  constructor(
    private http: HttpClient
  ) { }


  getCurrencyConversion():Observable<Currency[]> {
    if(!this.currencyData$){
      this.loading = true;

      const currencies = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
      const requests = currencies.map(currency => this.http.get<Currency>(`${this.url}${currency}`));
      this.currencyData$ = forkJoin(requests).pipe(
        shareReplay(1),
        switchMap(() =>
        timer(0, 3 * 60 * 1000).pipe(
          switchMap(() => {
            this.loading = true;
            return forkJoin(requests)
          }),
          switchMap(data => {
            this.loading = false;
            return forkJoin(requests);
          })
        )
        )
      );
    }
    return this.currencyData$;
    
  }

isLoading(): boolean {
  return this.loading;
}

}