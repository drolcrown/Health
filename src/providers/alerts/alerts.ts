import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccessFirebaseProvider } from '../access-firebase/access-firebase';
import { Cripty } from '../../utils/Cripty';
import { CacheProvider } from '../cache/cache';

@Injectable()
export class AlertsProvider {
  private perfil;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController) { 
    }

  loginAlert(code){
    if(code.indexOf('auth/invalid-email') >= 0){
      return 'Email Invalido';
    }
    else if(code.indexOf('auth/user-not-found') >= 0){
      return 'Usuario Não encontrado';
    }
    else if(code.indexOf('auth/wrong-password') >= 0){
      return 'Email ou Senha Incorretos';
    }
    else if(code.indexOf('auth/network-request-failed') >=  0){
      return 'Falha no Login!! Tente Novamente';
    }
  }


  newAlert() {
    return this.alertCtrl;
  }

  presentLoading(valor) {
    let duration = (valor * 1000);
    const loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: duration,
      dismissOnPageChange: true,
    });
    loader.present();
  }

  cadastroOkAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cadastrado com Sucesso!',
      buttons: ['Ok']
    });
    alert.present();
  }

  showToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom',
      cssClass: 'text-center',
      closeButtonText: 'Fechar',
      showCloseButton: true
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }
}