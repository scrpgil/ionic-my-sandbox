import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2ZoomAreaPage } from './ionic2-zoom-area';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        Ionic2ZoomAreaPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(Ionic2ZoomAreaPage),
    ],
})
export class Ionic2ZoomAreaPageModule {}
