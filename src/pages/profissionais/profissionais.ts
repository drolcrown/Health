import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { mocks } from '../../models/mocks';
import { RenderProvider } from '../../providers/render/render';

/**
 * Generated class for the ProfissionaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profissionais',
  templateUrl: 'profissionais.html',
})
export class ProfissionaisPage {
  profissionais: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider, public render: RenderProvider) {
    this.profissionais = mocks.profissionais;
    // this.profissionais = this.provider.getAll("profissional");
  }

  ionViewDidLoad() {
  }

}
