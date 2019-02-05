import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ProfissionalComponent } from './forms/profissional/profissional';
import { ListComponent } from './list/list';
import { ChatComponent } from './chat/chat';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ChatComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ChatComponent,
    ]
})
export class ComponentsModule {}
