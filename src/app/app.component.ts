import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {VidalRecoClic} from '@vidal-community/vidal-web-components';
import {OutPutProduct} from '@vidal-community/vidal-web-components/vidal-reco-clic/models/out-put-product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'demo-integration-web-component';

  @ViewChild('vrc')
  vidalRecoClicElementRef: ElementRef;

  ngAfterViewInit(): void {
    const vidalRecoClicElement = this.vidalRecoClicElementRef.nativeElement as VidalRecoClic;
    vidalRecoClicElement.dataFetchingSupplier = (url) => fetch('//recoclic.dockersw2.vidal.fr' + url);
    vidalRecoClicElement.recoId = 1478;
    vidalRecoClicElement.outputProductEvent = this.printOutput;
  }

  printOutput(outputProduct: OutPutProduct): void {
    console.log(outputProduct);
  }

}
