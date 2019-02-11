import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  private nome = "";
  private label = "";
  private lista = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController,
    public cache: CacheProvider) {
  }

  ionViewDidEnter() {
    this.nome = this.navParams.get('nome');
    if (this.nome) {
      this.cache.updateCache(this.nome)
        .then(resp => {
          if (this.nome == 'profissional') {
            this.lista = resp;
          }
        });
    }

    // this.cache.updateCache('especialidades').then(resp => {
    //   resp.forEach(element => {
    //     console.log(Object.keys(element))
    //     // // .map(k => {
    //     // //   console.log(element[k])
    //     // });
    //   });
    // });

  }

  logIn(mail, password) {
    this.viewCtrl.dismiss({ mail: mail, password: password });
  }

}
