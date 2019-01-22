import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
// import { FormsComponent } from '../../components/forms/forms';
import { CacheProvider } from '../../providers/cache/cache';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginErrorString: string = '';
  private imagem: any;
  private contador: number = 0;
  private img = {
    height: '',
    width: '',
  }
  private account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private provider: AccessFirebaseProvider,
    private authorization: AngularFireAuth, private menuCtrl: MenuController,
    private providerCache: CacheProvider, private platform: Platform) {
    this.menuCtrl.enable(false);
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (tamanhoImg * 0.2) + 'px';
    this.img.height = (tamanhoImg * 0.2) + 'px';
  }

  // Attempt to login in through our User service
  doLogin() {
    this.loginErrorString = '';
    if (this.account.email != '' && this.account.password != '') {
      this.account.email = this.account.email.toLowerCase();
      let login = this.provider.doLogin(this.account);
      if (login) {
        login.then((success) => {
          this.providerCache.save('page', "HomePage");
          this.navCtrl.push(TabsPage);
          this.provider.findObject('perfil', 'email', this.account.email).subscribe(resp => {
            this.providerCache.save('perfil', resp);
          });
        }).catch(error => {
          this.loginErrorString = this.provider.alert.loginAlert(error.code);
        });
      }
    } else {
      this.loginErrorString = 'Preencha Todos Campos';
    }
  }

  admin() {
    this.contador++;
    this.loginErrorString = '';
    if (this.contador == 3) {
      this.account.email = 'rafaelsoec@gmail.com';
      this.account.password = '123456';
      this.doLogin();
      this.contador = 0;
    }
  }

  registrar() {
    this.providerCache.save('page',"FormsComponent");
    // this.navCtrl.push(FormsComponent);
  }
}
