import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://www.alphavantage.co/query';
const FUNCTION = 'TIME_SERIES_INTRADAY';
const INTERVAL = '5min';
const API_KEY = 'EQPBR55AM4HFTR31';

@Injectable({
  providedIn: 'root'
})
export class RealtimeStockService {

  constructor(private http: HttpClient) {}

  getRealtimeStockData(symbol: string) {

    const params: any = {};
    params.function = FUNCTION;
    params.symbol = symbol;
    params.interval = INTERVAL;
    params.apikey = API_KEY;

    return this.http.get<any>(URL, {
      params: {
        ...params
      }
    });
  }
}
