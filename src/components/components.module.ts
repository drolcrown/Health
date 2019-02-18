import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ListComponent } from './list/list';
import { ChatComponent } from './chat/chat';
import { CadastroComponent } from './cadastro/cadastro';
import { ModalFiltrosComponent } from './modal-filtros/modal-filtros';
import { GaleriaDeFotosComponent } from './galeria-de-fotos/galeria-de-fotos';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ListComponent,
    ChatComponent,
    CadastroComponent,
    ModalFiltrosComponent,
    GaleriaDeFotosComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ListComponent,
    ChatComponent,
    CadastroComponent,
    ModalFiltrosComponent,
    GaleriaDeFotosComponent,
    ]
})
export class ComponentsModule {}
