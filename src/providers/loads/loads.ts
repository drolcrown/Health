import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadsProvider {

  constructor(public load: LoadingController) {

  }
  
  presentLoadingDefault() {
    let loading = this.load.create({
      content: 'Carregando...'
    });
  
    loading.present();
    return loading;
  }
  
  presentLoadingCustom() {
    let loading = this.load.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });
  
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();
  }
  
  presentLoadingText() {
    let loading = this.load.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

}
