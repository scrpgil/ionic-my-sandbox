import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MockProvider } from '../../providers/mock/mock';

@IonicPage({
    name:'dynamic-tabmenu',
    segment:'dynamic-tabmenu',
})
@Component({
    selector: 'page-dynamic-tabmenu',
    templateUrl: 'dynamic-tabmenu.html',
    providers: [MockProvider],
})
export class DynamicTabmenuPage {
    segments:any = [];
    items:any = [];
    activeIndex:number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, public mock:MockProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DynamicTabmenuPage');
        this.segments = this.mock.getSegmentItems();
        this.items = this.segments[0].items;
    }
    change(idx){
        this.activeIndex = idx;
    }
    close(idx){
        this.segments.splice(idx, 1);
    }
    addSegment(){
        let n = this.mock.getItem("menu" + this.segments.length, 15);
        this.segments.push(n);
    }
}
