import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { RealtimeStockService } from './realtime-stock.service';

const OPEN = '1. open';
const HIGH = '2. high';
const LOW = '3. low';
const CLOSE = '4. close';
const VOLUME = '5. volume';


@Component({
  selector: 'app-realtime-stock',
  templateUrl: './realtime-stock.component.html',
  styleUrls: ['./realtime-stock.component.css']
})
export class RealtimeStockComponent implements OnInit {

  chart: any;
  open: any;
  high: any;
  low: any;
  close: any;
  volume: any;

  symbols: any = [
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'GOOG', name: 'Google' },
    { symbol: 'NFLX', name: 'Netflix' },
    { symbol: 'AMZN', name: 'Amazon' },
  ];

  constructor(private realtimeStockService: RealtimeStockService) {
    this.getRealtimeStockData(this.symbols[0].symbol);
  }

  ngOnInit() {
  }

  getRealtimeStockData(symbol: string) {
    this.realtimeStockService.getRealtimeStockData(symbol).subscribe(res => {

      const timeSeries = res['Time Series (5min)'];
      const data = [];
      let item;

      for (const rawItem of Object.keys(timeSeries)) {
        item = timeSeries[rawItem];

        data.push([new Date(rawItem).getTime(),
        parseFloat(item[CLOSE])]);
      }
      this.open = item[OPEN];
      this.high = item[HIGH];
      this.low = item[LOW];
      this.close = item[CLOSE];
      this.volume = item[VOLUME];

      this.populateChart(symbol, data);
    });

  }

  populateChart(symbol: any, chartData: any) {
    const options: any = this.chartIntraDay(symbol, chartData);
    this.chart = new Chart(options);
  }


  chartIntraDay(symbol, chartData) {
    const config = {
      chart: { type: 'line' },
      title: { text: symbol },
      xAxis: {
        type: 'datetime'
      },
      series: [{
        name: symbol,
        data: chartData
      }],
      rangeSelector: {
        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'day',
          count: 1,
          text: '1D'
        }, {
          type: 'all',
          count: 1,
          text: 'All'
        }],
        selected: 1,
        inputEnabled: false
      }
    };

    return config;
  }

  onSymbolChange(event) {
    this.getRealtimeStockData(event.target.value);
  }

}
