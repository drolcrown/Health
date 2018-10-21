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
  private img = {
    height: '',
    width: '',
  }
  private account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  private mostrarSenha = false;
  private loginErrorString: string = '';
  private imagem;

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
        this.loginErrorString = 'Sucesso';
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        this.loginErrorString = 'Email ou Senha Incorretos';
      });
    }else{
      this.loginErrorString = 'Preencha os Campos';
    }
  }

  teste() {
    let nov = {
      nome: 'rafa',
      data: '1994-03-03',
      imagem: '41682102_1406592266152427_7612888278722674688_n.jpg',
      cidade: 'Brasilia',
      estado: 'Distrito Federal',
      email: 'rafa.jones@hotmail.com',
      senha: '123123123',
      confirmarSenha: '123123123',
    }
    console.log(nov.imagem)
    // this.provider.upload(nov);
  }

  registrar() {
    this.navCtrl.setRoot(FormsComponent)
  }
}
