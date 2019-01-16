import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { AlertsProvider } from '../alerts/alerts';
import { Subject} from 'rxjs';
import { LoadsProvider } from '../loads/loads';

@Injectable()
export class AccessFirebaseProvider {
  private perfis = [];

  constructor(private db: AngularFireDatabase, private fp: FirebaseApp,
    public authorization: AngularFireAuth, private camera: Camera,
    public alert: AlertsProvider, public loadingCtrl: LoadsProvider) {
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

  getAll(PATH): any {
    this.db.list(PATH).valueChanges().subscribe(valor => {
      this.alert.presentLoading(3);
    });
    return this.db.list(PATH).valueChanges();
  }

  get(PATH: any, key: string): any {
    return this.db.object(PATH + '/' + key).valueChanges();
  }

  findObject(path: string, key: string, value: string): any {
    let newObject = new Subject();
    let ref = this.db.database.ref(path);
    ref.orderByChild(key).equalTo(value)
      .on("child_added", (snapshot) => {
        this.get(path, snapshot.key).subscribe(response => {
          newObject.next(response);
        });
      });

    return newObject;
  }

  getKey(PATH: any, object: any): Subject<any> {
    // object = (object.length ? object : Object.entries(object)[1]);
    let childData, idEncontrado = false;
    let newObject = new Subject();
    let starCountRef = firebase.database().ref(PATH);
    starCountRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childData = (childSnapshot.val().email != null ? childSnapshot.val().email : childSnapshot.val().nome);
        if (!idEncontrado) {
          for (let i = 0; i < object.length; i++) {
            if (object[i] == childData) {
              newObject.next({ key: childSnapshot.key, value: childData });
              i = object.length;
              idEncontrado = true;
            }
          };
        }
      });
    });

    return newObject;
  }

  update(PATH: any, object: any) {
    this.getKey(PATH, object).subscribe(obj => {
      console.log(obj)
        this.db.list(PATH).update(obj.key, object);
    }, ((error) => {
      return this.alert.showToast('Falha na Operação!');
    }), (() => {
      return this.alert.showToast('Ação Concluída com Sucesso!');
    }));
  }

  save(PATH: any, object: any): any {
    this.db.list(PATH).push(object)
      .then((response) => {
        this.alert.cadastroOkAlert();
      })
    // return this.alert.showToast('Ação Concluída com Sucesso!');
  }

  remove(PATH: any, usuario) {
    this.getKey(PATH, usuario).subscribe(obj => {
      this.db.list(PATH).remove(obj.key);
    }, ((error) => {
      return this.alert.showToast('Falha na Operação!');
    }), (() => {
      return this.alert.showToast('Ação Concluída com Sucesso!');
    }));
  }

  upload(usuario, arq): Subject<any> {
    let subject = new Subject();
    let PATH = '/Usuarios/' + usuario.email + '.jpg';
    let arquivo = arq.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let picture = storage().ref(PATH);
      picture.putString(e.target.result, 'data_url');
    };
    reader.readAsDataURL(arquivo);
    let urlDowload = storage().ref(PATH).getDownloadURL();
    urlDowload
      .then(success => {
        usuario.imagem = success;
        this.update('perfil/', usuario);
        subject.next(success);
      })
      .catch((erro) => {
        subject.next(erro);
      });

      return subject;
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
