import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
// import * as firebase from 'firebase';
import { AlertsProvider } from '../alerts/alerts';

@Injectable()
export class AccessFirebaseProvider {
  private perfis = [];

  constructor(public db: AngularFireDatabase, public fp: FirebaseApp,
    public authorization: AngularFireAuth, public camera: Camera,
    public alert: AlertsProvider) {
  }

  doLogin(account) {
    if (account.email && account.password) {
      this.alert.presentLoading(1);
      return this.authorization.auth.signInWithEmailAndPassword(account.email, account.password);
    } else {
      return null;
    };
  }

  getAll(PATH) {
    this.alert.presentLoading(1);
    return this.db.list(PATH).valueChanges();
  }

  get(PATH: any, key: string) {
    this.alert.presentLoading(1);
    return this.db.object(PATH + '/' + key).valueChanges();
  }

  save(PATH: any, object: any) {
    if (object.key) {
      return this.db.list(PATH).update(object.key, object)
    } else {
      return this.db.list(PATH).push(object)
    }
  }

  remove(PATH: any, key: string) {
    return this.db.list(PATH).remove(key);
  }

  upload(usuario, arq) {
    let result = usuario.nome + '-' + usuario.imagem.substring(12, usuario.imagem.lenght);
    let arquivo = arq.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let picture = storage().ref(`/Usuarios/${result}`);
      picture.putString(e.target.result, 'data_url');
    };
    reader.readAsDataURL(arquivo);
  }

  // async takePhoto() {
  //   try {
  //     const options: CameraOptions = {
  //       quality: 50,
  //       targetHeight: 600,
  //       targetWidth: 600,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       correctOrientation: true
  //     }

  //     let result = await this.camera.getPicture(options);
  //     let image = `data:image/jpeg;base64,${result}`;
  //     let picture = storage().ref('pictures/');
  //     picture.putString(image, 'data_url');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}
