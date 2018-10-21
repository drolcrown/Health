import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { ProfissionalComponent } from './forms/profissional/profissional';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    ProfissionalComponent,
    ]
})
export class ComponentsModule {}
