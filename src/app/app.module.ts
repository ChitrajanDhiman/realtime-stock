import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';

import { RealtimeStockComponent } from './realtime-stock/realtime-stock.component';

@NgModule({
  declarations: [
    RealtimeStockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [RealtimeStockComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }
  ngDoBootstrap() {
    // Convert `RealtimeStockComponent` to a custom element.
    // createCustomElement<P>(component: Type<any>, config: NgElementConfig): NgElementConstructor<P>
    // A configuration that initializes an NgElementConstructor with the dependencies and strategy it
    // needs to transform a component into a custom element class

    const element = createCustomElement(RealtimeStockComponent, { injector: this.injector });
    // Register the custom element with the browser.
    customElements.define('realtime-stock', element);

  }
}
