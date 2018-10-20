import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AccessFirebaseProvider {

  constructor(public db: AngularFireDatabase) {
  }

  getAll(PATH) {
    return this.db.list(PATH).valueChanges();
  }

  get(PATH: any, key: string) {
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
}
