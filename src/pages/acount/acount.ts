import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { take } from 'rxjs/operator/take';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private conta;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: AccessFirebaseProvider, public authorization: AngularFireAuth) {
    let email = this.authorization.auth.currentUser.email;
    this.conta = this.provider.getPerfilByEmail('perfil/', email);
  }

  ionViewDidLoad() {
    console.log(this.conta);
    console.log(this.email);
  }

}
