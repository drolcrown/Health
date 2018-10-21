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
  private img = {
    height: (window.screen.height * 0.15) + 'px',
    width: (window.screen.height * 0.15) + 'px',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider, public authorization: AngularFireAuth) {
    // let email = this.authorization.auth.currentUser.email;
    // console.log(email);
  }

  ionViewDidLoad() {
    this.email =  this.authorization.auth.currentUser.email;
    this.perfis = this.provider.getAll('perfil/');
  }

}
