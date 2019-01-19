import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ProfissionalComponent } from './forms/profissional/profissional';
import { ListComponent } from './list/list';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ListComponent,
    ]
})
export class ComponentsModule {}
