import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElasticTextarea2Page } from './elastic-textarea2';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
    declarations: [
        ElasticTextarea2Page,
    ],
    imports: [
        DirectivesModule,
        IonicPageModule.forChild(ElasticTextarea2Page),
    ],
})
export class ElasticTextarea2PageModule {}
