import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsComponent } from '../../components/forms/forms';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  private loginErrorString: string = '';

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    private authorization: AngularFireAuth) {
  }

  // Attempt to login in through our User service
  doLogin() {
    if (this.account.email && this.account.password) {
      let login = this.authorization.auth.signInWithEmailAndPassword(this.account.email, this.account.password);
      login.then(() => {
        this.navCtrl.setRoot(HomePage)
      }).catch(error => {
      });
        this.loginErrorString = 'Email ou Senha Incorretos';
    }else{
      this.loginErrorString = 'Preencha os Campos';
    }
  }

  registrar() {
    this.navCtrl.setRoot(FormsComponent)
  }
}
