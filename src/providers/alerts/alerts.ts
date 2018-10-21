import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 3000
    });
    loader.present();
  }

  msgAlert(comp, msg) {
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}