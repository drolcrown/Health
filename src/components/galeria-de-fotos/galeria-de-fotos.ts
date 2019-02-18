import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the GaleriaDeFotosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'galeria-de-fotos',
  templateUrl: 'galeria-de-fotos.html'
})
export class GaleriaDeFotosComponent {
  images = [];
  grid = true;

  @Input()
  private set imagens(value){
    console.log(value)
    this.images = value;
  }

  constructor(public navCtrl: NavController) {

    //adicionando 10 imagens randomicas no array images
    for (var i = 0; i < 10; i++) {
      this.images.push({ url: 'https://source.unsplash.com/random/800x600?i=' + i })
    }
  }

  //para mudar de uma foto por linha
  changeGrid() {
    this.grid = !this.grid;
  }
}
