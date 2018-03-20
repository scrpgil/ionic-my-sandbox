import { NgModule } from '@angular/core';
import { ZoomPanDirective } from './zoom-pan/zoom-pan';
import { ElasticDirective } from './elastic/elastic';
@NgModule({
	declarations: [ZoomPanDirective,
    ElasticDirective],
	imports: [],
	exports: [ZoomPanDirective,
    ElasticDirective]
})
export class DirectivesModule {}
