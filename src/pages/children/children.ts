import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChildrenRenderPage } from '../children-render/children-render';

/**
 * Generated class for the ChildrenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children',
  templateUrl: 'children.html',
})
export class ChildrenPage {
  private objeto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.objeto = this.navParams.get("objeto");
  }

  ionViewDidLoad() {
  }

  openPage(object: any){
    this.navCtrl.push(ChildrenRenderPage, {objeto: object});
  }

}
