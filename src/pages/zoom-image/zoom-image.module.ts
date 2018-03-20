import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZoomImagePage } from './zoom-image';

import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    ZoomImagePage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ZoomImagePage),
  ],
})
export class ZoomImagePageModule {}
