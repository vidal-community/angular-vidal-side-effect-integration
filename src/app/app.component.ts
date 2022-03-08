import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {VidalRecoClic} from '@vidal-community/vidal-web-components';
import {OutputProduct} from '@vidal-community/vidal-web-components/vidal-reco-clic/models/output-product';
import {VidalSideEffect} from '@vidal-community/vidal-web-components/vidal-side-effect/vidal-side-effect';
import {VidalHistoryTtt} from '@vidal-community/vidal-web-components/vidal-history-ttt/vidal-history-ttt';
import {Gender} from '@vidal-community/vidal-web-components/vidal-history-ttt/model/gender';
import {Patient} from '@vidal-community/vidal-web-components/vidal-history-ttt/model/patient';


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

   @ViewChild('vht')
   vidalHistoryTttElementRef: ElementRef;

   ngAfterViewInit(): void {
      const vidalRecoClicElement = this.vidalRecoClicElementRef.nativeElement as VidalRecoClic;
      vidalRecoClicElement.dataFetchingSupplier = (url) => fetch('//recoclic.dockersw2.vidal.fr' + url);
      vidalRecoClicElement.recoIds = [1476, 1746, 1441, 1778, 3758, 4032, 2720, 1478];
      vidalRecoClicElement.outputProductEvent = this.printOutput;

      const vidalSideEffectElement = this.vidalSideEffectElementRef.nativeElement as VidalSideEffect;
      vidalSideEffectElement.sideEffectsSupplier = (url) => fetch('//recoclic.dockersw2.vidal.fr' + url);
      vidalSideEffectElement.drugIds = ['vidal://product/18221', 'vidal://product/19649'];

      const vidalHistoryTttElement = this.vidalHistoryTttElementRef.nativeElement as VidalHistoryTtt;
      vidalHistoryTttElement.dataFetchingSupplier = (uri) => {
         if (uri.includes('rest/api/package/41217?aggregate=ATC_CLASSIFICATION')) {
            return Promise.reject('Fake error only for dev purpose');
         }
         if (uri.includes('rest/api/search?code=3400936485464')) {
            return Promise.reject('Fake error only for dev purpose');
         }
         const url = `//recoclic.dockersw2.vidal.fr${uri}`;
         console.log(`Vidal API call ⏳: ${url}`);
         return fetch(url);
      };
      vidalHistoryTttElement.patient = {sex: Gender.MALE, dateOfBirth: new Date('1994-09-19')} as Patient;
      vidalHistoryTttElement.dataDate = new Date('2022-01-01');
      vidalHistoryTttElement.dataSource = 'DP (dossier pharmaceutique)';
      vidalHistoryTttElement.medicationDispenses = [
         {
            medicationCode: '3166830' /* CIP d'une présentation MULTI CLASSE  */,
            dispensations: [{startDate: '2021-08-20', endDate: '2021-08-25'}, {startDate: '2021-10-12'}],
         },
         {
            medicationCode: '3400955458913' /* CIP13 MULTI CLASSE même parent */,
            dispensations: [{startDate: '2021-10-20'}, {startDate: '2021-12-12'}],
         },
         {
            medicationCode: '9239091' /* UCD "DOLIPRANE 1000 mg Cpr Plq/100" */,
            dispensations: [{startDate: '2021-07-20', quantity: 2}, {startDate: '2021-09-12'}],
         },
         {
            medicationCode: '3400893766521' /* UCD13 "EFFERALGAN 1000 mg Cpr pell Plq/8" */,
            dispensations: [{startDate: '2021-09-12'}, {startDate: '2021-11-28'}],
         },
         {
            medicationCode: '3400935715715' /* CIP13 "BISOPROLOL ALMUS 10 mg Cpr séc Plq/30" */,
            dispensations: [{startDate: '2021-08-25', quantity: 5}, {startDate: '2021-09-26'}],
         },
         {
            medicationCode: '3400931742845', /* CIP13 "LEXOMIL 6mg Cpr qséc T/30" */
            dispensations: [{startDate: '2021-01-29'}, {startDate: '2021-12-24'}]
         },
         {
            medicationCode: '3400935542845', /* Code inconnu */
            dispensations: [{startDate: '2021-01-29'}, {startDate: '2021-12-24'}]
         },
         {
            medicationCode: '3400933429591', /* CIP13 "ACULAR 0,5% Collyre Fl/5ml" */
            dispensations: [{startDate: '2021-01-09', quantity: 1}, {startDate: '2021-02-25', quantity: 1},
               {startDate: '2021-03-15', quantity: 1}, {startDate: '2021-04-01', quantity: 1}, {
                  startDate: '2021-07-01',
                  quantity: 1
               }, {startDate: '2021-08-01', quantity: 1}, {startDate: '2021-09-01', quantity: 1},
               {startDate: '2021-10-01', quantity: 1}, {startDate: '2021-11-01', quantity: 1}]
         },
         {
            medicationCode: '3584585', /* CIP AC FOLIQ CCD 0,4mg Cpr Plq/30 */
            dispensations: [{startDate: '2021-06-18'}]
         },
         {
            medicationCode: '3400894228202', /* CIP13 "VENCLYXTO 50MG CPR" */
            dispensations: [{startDate: 'pas-une-date'}, {startDate: '2021-14-01'},
               {startDate: '21-06-18'}, {startDate: '2021-01-29'}, {startDate: '2021-12-24'}]
         },
         {
            medicationCode: '9451661', /* CIP "AMLODIP/VALS.EVO 5/80MG CPR" */
            dispensations: []
         }, {
            medicationCode: '',
            dispensations: [{startDate: '2021-12-24'}]
         },
         {
            medicationCode: '0000620', /* CIP "CARBO VEGETABILIS D8 CRATAEGUS DIGESTE D2 AA SOLUTION BUVABLE EN GOUTTES" */
            dispensations: [{startDate: '2022-01-15'}]
         },
         {
            medicationCode: '3400937593007', /* CIP13 "ZOSTAVAX Pdr & solv susp inj Fl+Ser préremp+2aig" (no VMP) */
            dispensations: [{startDate: '2021-06-18', endDate: '2021-07-24'}]
         },
         {
            medicationCode: '9176137', /* UCD "ACTIFED RHUME JOUR&NUIT CPR" (no VMP) */
            dispensations: [{startDate: '2021-06-18'}]
         },
         {
            medicationCode: '9429012', /* UCD "ACARIZAX 12 LYOT ORA" */
            dispensations: [{startDate: '2022-01-01'}, {startDate: '2022-01-11'}]
         },
         {
            medicationCode: '9312876', /* UCD "BETAINE CITR CRT 10% GLE 250G" */
            dispensations: [{startDate: '2022-01-02'}, {startDate: '2022-01-12'}]
         },
         {
            medicationCode: '9234372', /* UCD "ACICLOVIR EG 200MG CPR" */
            dispensations: [{startDate: '2022-01-03'}, {startDate: '2022-01-13'}]
         },
         {
            medicationCode: '9224824', /* UCD "ATENOLOL EG 50MG CPR" */
            dispensations: [{startDate: '2022-01-04'}, {startDate: '2022-01-14'}]
         },
         {
            medicationCode: '9156873', /* UCD "ACTILYSE INJ FL+FL10ML" */
            dispensations: [{startDate: '2022-01-05'}, {startDate: '2022-01-15'}]
         },
         {
            medicationCode: '9389867', /* UCD "ANTIGONE 75µG CPR" */
            dispensations: [{startDate: '2022-01-06'}, {startDate: '2022-01-16'}]
         },
         {
            medicationCode: '9009994', /* UCD "BELUSTINE 40MG GELU" */
            dispensations: [{startDate: '2022-01-07'}, {startDate: '2022-01-17'}]
         },
         {
            medicationCode: '9234857', /* UCD "ALLOPURINOL ARW 100MG CPR" */
            dispensations: [{startDate: '2022-01-08'}, {startDate: '2022-01-18'}]
         },
         {
            medicationCode: '9201987', /* UCD "ADENOSCAN 30MG/10ML IV FL" */
            dispensations: [{startDate: '2022-01-09'}, {startDate: '2022-01-19'}]
         },
         {
            medicationCode: '9409618', /* UCD "BETMIGA 50MG CPR LP" */
            dispensations: [{startDate: '2022-01-10'}, {startDate: '2022-01-20'}]
         },
         {
            medicationCode: '9217669', /* UCD "ANTARENE 100MG CPR" */
            dispensations: [{startDate: '2022-01-11'}, {startDate: '2022-01-21'}]
         },
         {
            medicationCode: '9127469', /* UCD "ALPHACAINE SP INJ CARTCHE" */
            dispensations: [{startDate: '2022-01-12'}, {startDate: '2022-01-22'}]
         },
         {
            medicationCode: '9010230', /* UCD "BEPANTHENE 100MG CPR" */
            dispensations: [{startDate: '2022-01-13'}, {startDate: '2022-01-23'}]
         },
         {
            medicationCode: '9000808', /* UCD "ACID.URSODESOX.BGA 500MG CPR" */
            dispensations: [{startDate: '2022-01-14'}, {startDate: '2022-01-24'}]
         },
         {
            medicationCode: '9318809', /* UCD "	ADVIL 400MG CPR" */
            dispensations: [{startDate: '2022-01-15'}, {startDate: '2022-01-25'}]
         }, {
            medicationCode: '9319252', /* UCD "ADVILCAPS 200MG CAPS MOL" */
            dispensations: [{startDate: '2022-01-26'}, {startDate: '2022-01-30'}]
         },
         {
            medicationCode: '9401189', /* UCD "PAROCLINE 2% GEL DENT SRG" */
            dispensations: [{startDate: '2022-01-16'}, {startDate: '2022-01-26'}]
         },
         {
            medicationCode: '9445324', /* UCD "AGOMELATINE BGA 25MG CPR" */
            dispensations: [{startDate: '2022-01-17'}, {startDate: '2022-01-27'}]
         },
         {
            medicationCode: '9441697', /* UCD "ALLERGIFLASH 0,05% COLLY F5ML" */
            dispensations: [{startDate: '2022-01-18'}, {startDate: '2022-01-28'}]
         },
         {
            medicationCode: '9414708', /* UCD "ALODONT BAIN BCHE FP200ML +GOD" */
            dispensations: [{startDate: '2022-01-19'}, {startDate: '2022-01-29'}]
         },
         {
            medicationCode: '9232166', /* UCD "ACTIFED RHUME CPR" */
            dispensations: [{startDate: '2022-01-20'}, {startDate: '2022-01-30'}]
         },
         {
            medicationCode: '9182132', /* UCD "CELLCEPT 250MG GELU" */
            dispensations: [{startDate: '2022-01-21'}, {startDate: '2022-01-31'}]
         },
         {
            medicationCode: '9400592', /* UCD "ADEMPAS 2MG CPR" */
            dispensations: [{startDate: '2022-01-22'}, {startDate: '2022-02-01'}]
         },
         {
            medicationCode: '9323101', /* UCD "BRIDION 100MG/ML INJ FL2ML" */
            dispensations: [{startDate: '2022-01-23'}, {startDate: '2022-02-02'}]
         },
         {
            medicationCode: '3400939879697', dispensations: [{startDate: '2021-08-22', endDate: '2021-09-22'},
               {startDate: '2021-09-22', endDate: '2021-10-22'}, {startDate: '2022-01-22'}]
         }
      ];
      vidalHistoryTttElement.drugsForDateEvent = (value) => console.log(value);
   }

   printOutput(outputProduct: OutputProduct): void {
      console.log(outputProduct);
   }

}
