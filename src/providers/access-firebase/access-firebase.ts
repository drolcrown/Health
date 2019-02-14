import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { AlertsProvider } from '../alerts/alerts';
import { Subject, from, Observable } from 'rxjs';
import { LoadsProvider } from '../loads/loads';
import { timeout, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { sha256, sha224 } from 'js-sha256';
// import { AlertController } from 'ionic-angular';

@Injectable()
export class AccessFirebaseProvider {
  private perfis = [];
  constructor(public db: AngularFireDatabase, private fp: FirebaseApp,
    public authorization: AngularFireAuth, private camera: Camera,
    public alert: AlertsProvider, public loadingCtrl: LoadsProvider) {
  }

  encripty(key: string) {
    let hash = sha256.create();
    hash.update(key);
    return hash.hex();
  }

  pagination(path) {
    let ref = this.db.database.ref(path);
    return ref.orderByValue().limitToLast(50);
  }

  doLogin(account) {
    let loading = this.loadingCtrl.presentLoadingDefault();
    let password = this.encripty(account.password);
    let observable = from(this.authorization.auth.signInWithEmailAndPassword(account.email, password))
      .pipe(timeout(10000))
      .subscribe(
        (value) => {
          loading.dismiss();
          observable.unsubscribe();
        },
        (err) => {
          loading.dismiss();
          observable.unsubscribe();
        },
        () => { loading.dismiss(); }
      );

    return this.authorization.auth.signInWithEmailAndPassword(account.email, password);
  }

  getAll(PATH): Observable<any> {
    let loading = this.loadingCtrl.presentLoadingDefault();
    let observable = this.db.list(PATH).valueChanges()
      .pipe(timeout(10000), catchError(error => of(this.alert.showToast('Falha na Conexão!'))))
      .subscribe(
        (value) => {
          loading.dismiss();
          observable.unsubscribe();
        },
        (err) => {
          loading.dismiss();
          observable.unsubscribe();
        },
        () => { loading.dismiss(); }
      );

    return this.db.list(PATH).valueChanges();
  }

  get(PATH: any, key: string): any {
    return this.db.object(PATH + '/' + key).valueChanges();
  }

  findObject(path: string, key: string, value: string): Subject<any> {
    let newObject = new Subject();
    let ref = this.db.database.ref(path);
    ref.orderByChild(key).equalTo(value)
      .on("child_added", (snapshot) => {
        this.get(path, snapshot.key).subscribe(response => {
          if (response) {
            newObject.next(response);
          } else {
            newObject.next(null);
          }
        });
      });

    return newObject;
  }

  findListChat(path: string, param: string): Subject<any> {
    let newObject = [];
    let user;
    let subject = new Subject();
    this.getAll(path).subscribe((valor: any) => {
      valor.filter((element: any) => {
        if (element.user2 && element.user1) {
          if (element.user2.email.indexOf(param) > -1 || element.user1.email.indexOf(param) > -1) {
            if (element.user2.email.indexOf(param) > -1) {
              user = "user2";
            } else {
              user = "user1";
            }
            newObject.push(element);
          }
        }
      });
      subject.next({ user: user, list: newObject });
    });

    return subject;
  }


  // getChat(path: string, user1: string, user2: string): Subject<any> {
  //   let newObject = [];
  //   let user;
  //   let subject = new Subject();
  //   this.getAll(path).subscribe((valor: any) => {
  //     valor.filter((element: any) => {
  //       if ((element.user2 == user2 && element.user1 == user1) || (element.user2 == user1 && element.user1 == user2)){
  //         if (element.user2.email.indexOf(param) > -1 || element.user1.email.indexOf(param) > -1) {
  //           if (element.user2.email.indexOf(param) > -1) {
  //             user = "user2";
  //           } else {
  //             user = "user1";
  //           }
  //           newObject.push(element);
  //         }
  //       }
  //     });
  //     subject.next({ user: user, list: newObject });
  //   });

  //   return subject;
  // }

  getKey(PATH: any, object: any): Subject<any> {
    let childData, idEncontrado = false;
    let newObject = new Subject();
    let starCountRef = firebase.database().ref(PATH);
    starCountRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childData = (childSnapshot.val().email != null ? childSnapshot.val().email : childSnapshot.val().id);
        if (!idEncontrado) {
          if (object.email == childData || object.id == childData) {
            newObject.next({ key: childSnapshot.key, value: childData });
            idEncontrado = true;
          }
        }
      });
    });

    return newObject;
  }

  getKeyParams(path: string, key: string, value: string, object: any): any {
    let newObject = new Subject();
    let ref = this.db.database.ref(path);
    ref.orderByChild(key).equalTo(value)
      .on("child_added", (snapshot) => {
        console.log(snapshot)
        newObject.next({ key: snapshot.key, value: object });
      });

    return newObject;
  }

  update(PATH: any, object: any) {
    return this.db.list(PATH).update(object.id, object);
  }

  save(PATH: any, object: any): Subject<any> {
    let subject = new Subject();
    let loading = this.loadingCtrl.presentLoadingDefault();
    this.db.list(PATH).push(object)
      .then((response) => {
        object.id = response.key
        this.db.list(PATH).update(object.id, object);
        loading.dismiss();
        subject.next(response);
      });
    return subject;
  }

  remove(PATH: any, usuario) {
    this.db.list(PATH).remove(usuario.id).then(() => {
      return this.alert.showToast('Ação Concluída com Sucesso!');
    }).catch((error) => {
      return this.alert.showToast('Falha na Operação!');
    });
  }

  upload(usuario, arq): any {
    let PATH = '/Usuarios/' + usuario.email + '.jpg';
    let arquivo = arq.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let picture = storage().ref(PATH);
      picture.putString(e.target.result, 'data_url');
    };
    reader.readAsDataURL(arquivo);
    return storage().ref(PATH).getDownloadURL();
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

  updatePassword(perfil) {
    let alert = this.alert.alertCtrl.create({
      title: 'Alterar Senha',
      inputs: [
        {
          placeholder: 'Senha Atual',
          type: 'password',
          min: '6',
          name: 'senha',
        },
        {
          placeholder: 'Nova Senha',
          type: 'password',
          min: '6',
          name: 'senha1',
        },
        {
          placeholder: 'Repita a Nova Senha',
          type: 'password',
          min: '6',
          name: 'senha2',
        },
      ],
      buttons: [
        {
          text: 'Trocar',
          cssClass: 'btn btn-primary',
          handler: (data) => {
            if (data.senha1 && data.senha2 && data.senha) {
              perfil = this.verificarTrocaSenha(perfil, data);
            } else {
              this.alert.showToast("Preencha todos os campos!!");
            }
          }
        },
        {
          text: 'Cancelar',
          cssClass: 'btn btn-primary',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    alert.present();
    return perfil;
  }

  verificarTrocaSenha(perfil, alert) {
    let alerta = this.encripty(alert.senha);
    let alerta1 = this.encripty(alert.senha1);
    let alerta2 = this.encripty(alert.senha2);
    if (perfil.senha == alerta) {
      if (alerta1 == alerta2) {
        let loading = this.loadingCtrl.presentLoadingDefault();
        this.authorization.auth.currentUser.updatePassword(alerta1)
          .then((resp) => {
            perfil.senha = alerta1;
            this.update('perfil', perfil);
            loading.dismiss();
            this.alert.showToast('Senha Alterada Com Sucesso!!');
          }).catch((er) => {
            loading.dismiss();
            this.alert.showToast('Falha na Alteração de Senha!! Tente Novamente!!');
          });
      } else {
        this.alert.showToast("Senhas Diferentes!!");
      }
    } else {
      this.alert.showToast("Senha Atual Incorreta!!");
    }
    return perfil;
  }

  excluirConta(perfil): any {
    let response = false;
    this.alert.newAlert().create({
      title: 'Excluir Conta',
      inputs: [
        {
          placeholder: 'Digite a senha',
          type: 'password',
          min: '6',
          name: 'senha',
        },
      ],
      buttons: [
        {
          text: 'Excluir',
          cssClass: 'btn btn-primary',
          handler: (data) => {
            if (this.encripty(data.senha) == perfil.senha) {
              let loading = this.loadingCtrl.presentLoadingDefault();
              this.authorization.auth.currentUser.delete()
                .then(() => {
                  this.remove('perfil', perfil);
                  response = true;
                  loading.dismiss();
                }).catch(() => {
                  loading.dismiss();
                  this.alert.showToast('Falha na Exclusão de Conta!! Tente Novamente!!');
                });
            }
          }
        },
        {
          text: 'Cancelar',
          cssClass: 'btn btn-primary',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    }).present();
    return response;
  }
}
