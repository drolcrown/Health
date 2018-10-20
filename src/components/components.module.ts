import { NgModule } from '@angular/core';
import { HeaderComponent } from './core/header/header';
import { FormsComponent } from './forms/forms';
import { PacienteComponent } from './forms/paciente/paciente';
import { ProfissionalComponent } from './forms/profissional/profissional';

@NgModule({
	declarations: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    PacienteComponent,
    ProfissionalComponent,
    ],
	imports: [],
	exports: [HeaderComponent,
    HeaderComponent,
    FormsComponent,
    PacienteComponent,
    ProfissionalComponent,
    ]
})
export class ComponentsModule {}
