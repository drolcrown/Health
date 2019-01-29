import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [ExpandableComponent,
    HeaderComponent],
	imports: [],
	exports: [ExpandableComponent,
    HeaderComponent]
})
export class ComponentsModule {}
