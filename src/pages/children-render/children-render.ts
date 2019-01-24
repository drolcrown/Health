import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChildrenRenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-render',
  templateUrl: 'children-render.html',
})
export class ChildrenRenderPage {
  private objeto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.objeto = this.navParams.get("objeto");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildrenRenderPage');
  }

}
