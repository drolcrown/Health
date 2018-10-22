import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { AlertsProvider } from '../alerts/alerts';
import { Subject } from 'rxjs';

@Injectable()
export class AccessFirebaseProvider {
  private perfis = [];

  constructor(public db: AngularFireDatabase, public fp: FirebaseApp,
    public authorization: AngularFireAuth, public camera: Camera,
    public alert: AlertsProvider) {
  }

  doLogin(account) {
    if (account.email && account.password) {
      this.alert.presentLoading(2);
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

  getKey(PATH: any, object): Subject<any> {
    let childData;
    let newObject = new Subject();
    let starCountRef = firebase.database().ref(PATH);
    starCountRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childData = childSnapshot.val().email;
        if (object.email == childData) {
          newObject.next({ key: childSnapshot.key, value: childData });
        }
      });
    });
    return newObject;
  }

  async save(PATH: any, object: any) {
    let objeto;
    if (object.$key) {
      objeto = this.db.list(PATH).update(object.$key, object);
    } else {
      objeto = this.db.list(PATH).push(object)
    }
    objeto.then((e) => {
      this.alert.showToast('Ação Concluída com Sucesso!');
    }).catch(error => {
      this.alert.showToast('Falha na Operação!');
    });
    return await objeto;
  }

  remove(PATH: any, usuario) {
    this.getKey(PATH, usuario).subscribe(resp => {
      let objeto = this.db.list(PATH).remove(resp.key);
      objeto.then((e) => {
        this.alert.showToast('Ação Concluída com Sucesso!');
      }).catch(error => {
        this.alert.showToast('Falha na Operação!');
      });
    })
  }

  async upload(usuario, arq) {
    let PATH = '/Usuarios/' + usuario.email + '.jpg';
    let urlDowload = await storage().ref(PATH).getDownloadURL();
    urlDowload.then(success => {
      console.log('Upload ', success);
    }).catch(() => {
      let arquivo = arq.target.files[0];
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let picture = storage().ref(PATH);
        picture.putString(e.target.result, 'data_url');
      };
      reader.readAsDataURL(arquivo);
    });
    return urlDowload;
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
