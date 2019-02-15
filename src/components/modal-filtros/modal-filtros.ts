import { Component } from '@angular/core';
import { filtros } from '../../models/filtros';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { anuncios } from '../../models/anuncios';

/**
 * Generated class for the ModalFiltrosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-filtros',
  templateUrl: 'modal-filtros.html'
})
export class ModalFiltrosComponent {
  private form: FormGroup;
  private _filtros = filtros;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public builder: FormBuilder) {
    let filtrosParam = navParams.get("filtros");
    if (filtrosParam) {
      this.form = builder.group(filtrosParam);
    } else {
      this.form = builder.group(anuncios.filtros);
    }
  }

  public AddFilters() {
    this.viewCtrl.dismiss(this.form.value);
  }

}
