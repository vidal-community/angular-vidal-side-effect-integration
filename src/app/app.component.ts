import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {VidalRecoClic} from '@vidal-community/vidal-web-components';
import {OutputProduct} from '@vidal-community/vidal-web-components/vidal-reco-clic/models/output-product';
import {VidalSideEffect} from '@vidal-community/vidal-web-components/vidal-side-effect/vidal-side-effect';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'demo-integration-web-component';

  @ViewChild('vrc')
  vidalRecoClicElementRef: ElementRef;

  @ViewChild('vse')
  vidalSideEffectElementRef: ElementRef;

  ngAfterViewInit(): void {
    const vidalRecoClicElement = this.vidalRecoClicElementRef.nativeElement as VidalRecoClic;
    vidalRecoClicElement.dataFetchingSupplier = (url) => fetch('//recoclic.dockersw2.vidal.fr' + url);
    vidalRecoClicElement.recoId = 1478;
    vidalRecoClicElement.outputProductEvent = this.printOutput;

    const vidalSideEffectElement = this.vidalSideEffectElementRef.nativeElement as VidalSideEffect;
    vidalSideEffectElement.sideEffectsSupplier = (url) => fetch('//recoclic.dockersw2.vidal.fr' + url);
    vidalSideEffectElement.drugIds = ['vidal://product/18221','vidal://product/19649'];
  }

  printOutput(outputProduct: OutputProduct): void {
    console.log(outputProduct);
  }

}
