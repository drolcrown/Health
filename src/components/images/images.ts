import { Component } from '@angular/core';

/**
 * Generated class for the ImagesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'images',
  templateUrl: 'images.html'
})
export class ImagesComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

  ionViewDidEnter() {
    console.log('Hello ImagesComponent Component');

  }
  ngAfterViewInit() {
    console.log('Hello ImagesComponent Component');

  }

}
