import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheProvider {

  constructor(public storage: Storage) {
  }

  public clear(){
    this.storage.clear();
  }

  public remove(key: string){
    this.storage.remove(key);
  }

  public save(key: string, objeto: any){
    this.storage.set(key, objeto);
  }

  public get(key: string){
    return this.storage.get(key);
  }

  public getAll(){
    return this.storage.keys();
  }
}
