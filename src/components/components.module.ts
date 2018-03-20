import {IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ZoomAreaComponent } from './zoom-area/zoom-area';
@NgModule({
	declarations: [ZoomAreaComponent],
	imports: [CommonModule,IonicModule],
	exports: [ZoomAreaComponent]
})
export class ComponentsModule {}
