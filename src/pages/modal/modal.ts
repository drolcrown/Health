import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { storage } from 'firebase';
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
  private imgs = [];
  private user;
  private anuncio = anuncios;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public modalCtrl: ModalController, public navParams: NavParams,
    public builder: FormBuilder, public cache: CacheProvider, ) {
    this.user = navParams.get("usuario");
    this.anuncio.usuario = this.user.id;
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

  private salvarArquivo(arq) {
    // let PATH = '/Usuarios/' + usuario.email + '.jpg';
    let arquivos = arq.target.files;
    let reader = new FileReader();
    console.log(arq.target.value)
    console.log(arq)
    reader.onload = (e: any) => {
      console.log('to na globo')
      console.log(e.target.result)
      // let picture = storage().ref(PATH);
      // picture.putString(e.target.result, 'data_url');
    };
    for (let i = 0; i < arquivos.length; i++) {
      this.imgs.push(arquivos[i]);
    }
    console.log(this.imgs)
  }

  private openModalFilter() {
    let modal = this.modalCtrl.create(ModalFiltrosComponent, { filtros: this.form.controls.filtros.value })
    modal.present();

    modal.onDidDismiss(data => {
      let control = new FormControl(data);
      this.form.setControl('filtros', control);
    });
  }

  public addAdverts() {
    let anuncio = this.form.value;
    anuncio.chats = [""];
    this.provider.save("anuncio", anuncio).subscribe((resp) => {
      if(!this.user.anuncios[0]){
        this.user.anuncios[0] = resp;
      }else{
        this.user.anuncios.push(resp);
      }
      this.provider.update('usuario', this.user);
      this.cache.save('usuario', this.user);
      this.navCtrl.setRoot(HomePage, { atualizarAnuncios: true });
    });
  }
}
