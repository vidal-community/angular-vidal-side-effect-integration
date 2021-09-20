import {AfterViewInit, Component} from '@angular/core';
import {VidalSideEffect} from '@vidal-community/vidal-side-effect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'demo-integration-web-component';

  ngAfterViewInit(): void {
    const vidalSideEffectElement = document.querySelector('vidal-side-effect') as VidalSideEffect;
    vidalSideEffectElement.sideEffectsSupplier = (url) => fetch('http://localhost:8088' + url);
    vidalSideEffectElement.drugIds = ['vidal://product/19649'];
  }


}
