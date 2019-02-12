import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ListComponent } from './list/list';
import { ChatComponent } from './chat/chat';
import { CadastroComponent } from './cadastro/cadastro';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ListComponent,
    ChatComponent,
    CadastroComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ListComponent,
    ChatComponent,
    CadastroComponent,
    ]
})
export class ComponentsModule {}
