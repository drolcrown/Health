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
  updateDataBase(model, values) {
    this.db.database.ref(model).update(values);
  }

  doLogin(account) {
    if (account.email && account.password) {
      this.alert.presentLoading(10);
      return this.authorization.auth
        .signInWithEmailAndPassword(account.email, account.password)
        .then((resp) => {
        }).catch(error => {
          this.alert.showToast('Falha no Login!');
        });
    } else {
      return null;
    };
  }

  getAll(PATH): Subject<any> {
    let subject = new Subject();
    this.db.list(PATH).valueChanges().subscribe((obj: any) => {
      this.alert.presentLoading(3);
      subject.next(obj);
    }, ((error) => {
      this.alert.showToast('Falha na Operação!');
    }), (() => {
      this.alert.showToast('Ação Concluída com Sucesso!');
    }));
    return subject;
  }

  get(PATH: any, key: string) {
    return this.getAll(PATH + '/' + key);
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

  save(PATH: any, object: any) {
    this.getKey(PATH, object).subscribe(obj => {
      if (obj.key) {
        this.db.list(PATH).update(obj.key, obj.value);
      } else {
        this.db.list(PATH).push(obj.value)
      }
    }, ((error) => {
      this.alert.showToast('Falha na Operação!');
    }), (() => {
      this.alert.showToast('Ação Concluída com Sucesso!');
    }));
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

  upload(usuario, arq) {
    let PATH = '/Usuarios/' + usuario.email + '.jpg';
    let arquivo = arq.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let picture = storage().ref(PATH);
      picture.putString(e.target.result, 'data_url');
      this.alert.presentLoading(3);
    };
    reader.readAsDataURL(arquivo);
    let urlDowload = storage().ref(PATH).getDownloadURL();
    urlDowload.then(success => {
      usuario.imagem = success;
      this.save('perfil/', usuario);
    }).catch(() => { this.alert.showToast('Falha no Upload de Imagem') });
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
