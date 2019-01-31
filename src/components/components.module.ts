import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ProfissionalComponent } from './forms/profissional/profissional';
import { ListComponent } from './list/list';
import { ImagesComponent } from './images/images';
import { MenuComponent } from './menu/menu';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ImagesComponent,
    MenuComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ImagesComponent,
    MenuComponent,
    ]
})
export class ComponentsModule {}
