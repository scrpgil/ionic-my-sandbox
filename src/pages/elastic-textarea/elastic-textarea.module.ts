import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElasticTextareaPage } from './elastic-textarea';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
    declarations: [
        ElasticTextareaPage,
    ],
    imports: [
        DirectivesModule,
        IonicPageModule.forChild(ElasticTextareaPage),
    ],
})
export class ElasticTextareaPageModule {}
