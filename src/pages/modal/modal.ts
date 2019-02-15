import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { UFs } from '../../models/uf';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ModalFiltrosComponent } from '../../components/modal-filtros/modal-filtros';
import { anuncios } from '../../models/anuncios';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  private form: FormGroup;
  private _tipos = ["Apartamento", "Casa", "República"];
  private _sexo = ["Feminino", "Masculino"];
  private _estados = UFs;
  private muniON = false;
  private _municipios = [];
  private anuncio = anuncios;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public modalCtrl: ModalController, public navParams: NavParams,
    public builder: FormBuilder, public cache: CacheProvider, ) {
    let user = navParams.get("usuario");
    this.anuncio.email = user.email;
    this.anuncio.telefone = user.telefone;
    this.form = builder.group(this.anuncio);
  }

  public getMunicipio(value) {
    if (value) {
      this._estados.filter(el => {
        if (el.nome == value) {
          this._municipios = el.municipios;
          this.muniON = true;
          return;
        }
      });
    } else {
      this.muniON = false;
    }
  }


  private openModalFilter() {
    let modal = this.modalCtrl.create(ModalFiltrosComponent, { filtros: this.form.controls.filtros.value })
    modal.present();

    modal.onDidDismiss(data => {
      let control = new FormControl(data);
      this.form.setControl('filtros', control);
    });
  }

  public logIn() {
    this.provider.save("anuncio", this.form.value).subscribe(() => {
      this.navCtrl.push(HomePage);
    });
  }


}
