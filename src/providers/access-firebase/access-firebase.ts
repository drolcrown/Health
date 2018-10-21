import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { AlertsProvider } from '../alerts/alerts';

@Injectable()
export class AccessFirebaseProvider {
  private perfis = [];

  constructor(public db: AngularFireDatabase, public fp: FirebaseApp,
    public authorization: AngularFireAuth, public camera: Camera,
    public alert: AlertsProvider) {
  }

  getAll(PATH) {
    this.alert.presentLoading();
    return this.db.list(PATH).valueChanges();
  }

  get(PATH: any, key: string) {
    return this.db.object(PATH + '/' + key).valueChanges();
  }

  // getPerfilByEmail(email : string) {
  //   this.db.list('perfil/').valueChanges().pipe().subscribe( resp => {
  //     this.perfis = resp;
  //   });
  //   this.perfis.forEach( (obj) => {
  //     if(email == obj.email){
  //       return this.perfis;
  //     }
  //   });
  // }

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

  // upload(usuario) {
  //   let storage = this.fp.storage().ref();
  //   let ref = storage.child('Usuarios/profissional.png');
  //   var message = '41682102_1406592266152427_7612888278722674688_n.jpg';
  //   ref.putString(message, 'base64url').then(function(snapshot) {
  //     console.log('Uploaded a base64url string!');
  //   });
  //   // let basePath = '/Usuarios/' + this.authorization.auth.currentUser.uid;
  //   // let fullPath = basePath + usuario.nome + '.jpg';
  //   // let uploadT = storage.child(fullPath).putString(usuario.imagem, 'base64');
  //   // console.log(uploadT)
  //   // let uploadT = storage.child('/Usuarios').putString('41682102_1406592266152427_7612888278722674688_n.jpg', 'base64');
  //   console.log()
  //   // uploadT.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //   //   (snapshot) => {
  //   //     let respost = (uploadT.snapshot.bytesTransferred / uploadT.snapshot.totalBytes) * 100; 
  //   //     console.log(respost + '% done');
  //   //   },
  //   //   (error) => {
  //   //     console.error(error);
  //   //   },
  //   //   () => {
  //   //     usuario.imagem = uploadT.snapshot.downloadURL;
  //   //     this.save("perfil/", usuario);
  //   //   }
  //   // );
  // }

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
