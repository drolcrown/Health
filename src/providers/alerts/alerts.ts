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

  cadastroFailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falha no Cadastro!',
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