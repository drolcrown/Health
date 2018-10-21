import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private perfis;
  private email;
  private tamanho = {
    width: (window.screen.width * 0.85) + 'px',
    height: (window.screen.height * 0.8) + 'px',
  };
  private img = {
    height: '',
    width: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider, public authorization: AngularFireAuth) {
    // let email = this.authorization.auth.currentUser.email;
    // console.log(email);
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (window.screen.width * 0.6) + 'px';
    this.img.height = (tamanhoImg * 0.3) + 'px';
    console.log(this.img)
    console.log(this.tamanho)
  }

  ionViewDidLoad() {
    this.email = this.authorization.auth.currentUser.email;
    this.perfis = this.provider.getAll('perfil/');
  }

}
