import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public render: RenderProvider) {
  }

}
