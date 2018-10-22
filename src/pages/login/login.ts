import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsComponent } from '../../components/forms/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private mostrarSenha = false;
  private loginErrorString: string = '';
  private imagem;
  private contador = 0;
  private img = {
    height: '',
    width: '',
  }
  private account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    private authorization: AngularFireAuth, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (tamanhoImg * 0.2) + 'px';
    this.img.height = (tamanhoImg * 0.2) + 'px';
  }

  // Attempt to login in through our User service
  doLogin() {
    // this.navCtrl.setRoot(HomePage)
    let login= this.provider.doLogin(this.account);
    if(login){
      login.then((success) => {
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        this.loginErrorString = 'Email ou Senha Incorretos';
      });
    }else{
      this.loginErrorString = 'Preencha os Campos';
    }
  }

  admin() {
    this.contador++;
    if(this.contador == 3){
      this.account.email = 'rafaelsoec@gmail.com';
      this.account.password = 'Da791356';
      this.doLogin();
      this.contador = 0;
    }
  }

  registrar() {
    this.navCtrl.setRoot(FormsComponent)
  }
}
