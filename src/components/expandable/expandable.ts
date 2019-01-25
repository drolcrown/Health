import { Component, ViewChild, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {
  public _listExpanded;
  public html: string = "";

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper;

  @Input()
  public set listExpanded(value) {
    if (value) {
      this.html = this.recuperarItens(value);
    }
  }

  constructor() {
  }

  recuperarItens(lista) {
    lista.filter(el => {
      if (el.nome) {
        if (el.filhos) {
          this.html += "<br><strong>" + el.nome + "</strong><br>";
          this.recuperarItens(el.filhos);
        } else {
          this.html += "<small class='ml-3'>* " + el.nome + "</small><br>";
        }
      }
    });
    return this.html;
  }
  ionViewDidLoad() {
  }

}
