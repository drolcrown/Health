import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ProfissionalComponent } from './forms/profissional/profissional';
import { ListComponent } from './list/list';
import { MenuComponent } from './menu/menu';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    MenuComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    MenuComponent,
    ]
})
export class ComponentsModule {}
