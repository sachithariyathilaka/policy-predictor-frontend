import { Component, OnInit } from '@angular/core';
import {PredictService} from '../../service/predict-service';
import {OutputDto} from '../../service/outputDto';

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {

  highSpeed: string[] = [];
  drunk: string[] = [];
  natural: string[] = [];
  common: string[] = [];
  careless: string[] = [];
  recommendations: OutputDto[] = [];

  constructor(private predictService: PredictService) {}

    // @ts-ignore
  ngOnInit() {
    this.predictService.predictData().subscribe(response => {
      // @ts-ignore
      if (response !== null) {
        const countArr = response;
        const highSpeedCount = Math.round(countArr[0] * 10);
        const drunkCount = Math.round(countArr[1] * 10);
        const carelessCount = Math.round(countArr[2] * 10);
        const naturalCount = Math.round(countArr[3] * 10);
        const commonCount = Math.round(countArr[4] * 10);
        this.getCommonData();
        for (let i = 0; i < highSpeedCount; i++) {
          // @ts-ignore
          const highSpeed = new OutputDto();
          highSpeed.class = 'High Speed Driving';
          highSpeed.data = this.highSpeed[i];
          this.recommendations.push(highSpeed);
        }
        for (let j = 0; j < drunkCount; j++) {
          // @ts-ignore
          const drink = new OutputDto();
          drink.data = this.drunk[j];
          drink.class = 'Drunk & Driving';
          this.recommendations.push(drink);
        }
        for (let k = 0; k < carelessCount; k++) {
          // @ts-ignore
          const careless = new OutputDto();
          careless.data = this.careless[k];
          careless.class = 'Careless Driving';
          this.recommendations.push(careless);
        }
        for (let l = 0; l < naturalCount; l++) {
          // @ts-ignore
          const natural = new OutputDto();
          natural.data = this.natural[l];
          natural.class = 'Natural factors';
          this.recommendations.push(natural);
        }
        for (let m = 0; m < 10 - (highSpeedCount + drunkCount + carelessCount + naturalCount); m++) {
          // @ts-ignore
          const common = new OutputDto();
          common.data = this.common[m];
          common.class = 'Common factors';
          this.recommendations.push(common);
        }
      }
    }, error => {
      console.log(error);
    });
    }

  getCommonData() {
      this.drunk.push('Increase drunk & drive fine charges');
      this.drunk.push('Apply countdown for cancel driving licence');
      this.drunk.push('Place frequent police officers in near bars & restaurants');
      this.drunk.push('Introduce road line sensors to check availability of the driver');
      this.drunk.push('Monitor highway traffic using cctv cameras');

      this.highSpeed.push('Reduce maximum speed limit in city areas');
      this.highSpeed.push('Initialize three levels of speed limits for all roads');
      this.highSpeed.push('Increase fine for the high speed driving');
      this.highSpeed.push('Categorize vehicle types more effectively');
      this.highSpeed.push('Place speed breakers in high accident areas');

      this.careless.push('Implement maximum fine for accident with mobile phone use');
      this.careless.push('User road blocks several areas in the highways');
      this.careless.push('People encourage to have at least two peoples in long drive');
      this.careless.push('Reduce the maximum speed limit for recognize vehicles');
      this.careless.push('Place speed breakers in high accident areas');

      this.natural.push('Place road lights in dangerous areas');
      this.natural.push('Mark maximum speed for rainy days');
      this.natural.push('People encourage to use public vehicles');
      this.natural.push('Introduce one way road policy by day by day');
      this.natural.push('Reduce maximum speed of the vehicles in night time');

      this.common.push('Decrease time for medical replacement of the drivers');
      this.common.push('Increase traffic signals in recognized areas');
      this.common.push('Place CCTV cameras in each traffic light');
      this.common.push('Use one way roads when road development');
      this.common.push('Adjust age limit of eligibility of drivers');
    }
}
