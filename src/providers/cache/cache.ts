import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AccessFirebaseProvider } from '../access-firebase/access-firebase';

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

  async updateCache(key: string) {
    let minutes = new Date().getMinutes();
    
    return await this.get(key)
      .then(resp => {
        if (minutes == 30 || minutes == 59 || !resp) {
          this.provider.getAll(key).subscribe((value) => {
            this.save(key, value);
            return value;
          });
        } else {
          return resp;
        }
      }).catch((error) => {return null});
  }

  public getAll() {
    return this.storage.keys();
  }
}
