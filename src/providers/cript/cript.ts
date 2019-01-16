import { Injectable } from '@angular/core';
import { AES256 } from '@ionic-native/aes-256';

/*
  Generated class for the CriptProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/  
@Injectable()
export class CriptProvider {


  private secureKey: string;
  private secureIV: string;

  constructor(private aes256: AES256) {
    this.generateSecureKeyAndIV(); // To generate the random secureKey and secureIV
  }

  async generateSecureKeyAndIV() {
    this.secureKey = await this.aes256.generateSecureKey('random password 12345'); // Returns a 32 bytes string
    this.secureIV = await this.aes256.generateSecureIV('random password 12345'); // Returns a 16 bytes string
  }

  async encriptar() {
    return this.aes256.encrypt(this.secureKey, this.secureIV, 'testdata')
      .then(res => console.log('Encrypted Data: ', res))
      .catch((error: any) => console.error(error));
  }

  async desencriptar() {
    return this.aes256.decrypt(this.secureKey, this.secureIV, 'encryptedData')
      .then(res => console.log('Decrypted Data : ', res))
      .catch((error: any) => console.error(error));
  }
  async gerarSecKey() {
    this.aes256.generateSecureKey('random password 12345')
      .then(res => console.log('Secure Key : ', res))
      .catch((error: any) => console.error(error));
  }

  async gerarSecIV() {
    this.aes256.generateSecureIV('random password 12345')
      .then(res => console.log('Secure IV : ', res))
      .catch((error: any) => console.error(error));
  }
}
