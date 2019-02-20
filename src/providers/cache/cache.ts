import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AccessFirebaseProvider } from '../access-firebase/access-firebase';
import { Subject, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheProvider {

  constructor(public storage: Storage, private provider: AccessFirebaseProvider) {
  }

  public clear() {
    this.storage.clear();
  }

  public remove(key: string) {
    this.storage.remove(key);
  }

  public save(key: string, objeto: any) {
    this.storage.set(key, objeto);
  }

  public get(key: string) {
    return this.storage.get(key);
  }

  public updateCache(key: string): Subject<any> {
    let minutes = new Date().getMinutes();
    let subject = new Subject();
    this.get(key).then(resp => {
      if (minutes == 30 || minutes == 59 || !resp) {
        let loading = this.provider.loadingCtrl.presentLoadingDefault();
        let observable = this.provider.getAll(key)
          .pipe(timeout(10000), catchError(error => of(this.provider.alert.showToast('Falha na Conexão!'))))
          .subscribe(
            (value) => {
              this.save(key, value);
              subject.next(value);
              loading.dismiss();
              observable.unsubscribe();
            },
            (err) => {
              loading.dismiss();
              observable.unsubscribe();
              subject.next(err);
            },
            () => {
              if (loading) { loading.dismiss(); }
              observable.unsubscribe();
            }
          );
      } else {
        subject.next(resp);
      }
    })

    return subject;
  }

  public recoverUser(): Subject<any> {
    let subject = new Subject();
    this.get('usuario').then(perfil => {
      if (perfil) {
        subject.next(perfil);
      } else {
        this.provider.getAll('usuario').subscribe((users: Array<any>) => {
          users.filter(user => {
            if (user.email == this.provider.authorization.auth.currentUser.email) {
              subject.next(user);
            }
          });
        });
      }
    });
    return subject;
  }

  public getAll() {
    return this.storage.keys();
  }
}
