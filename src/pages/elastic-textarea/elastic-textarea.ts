import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'elastic-textarea',
    segment:'elastic-textarea'
})
@Component({
    selector: 'page-elastic-textarea',
    templateUrl: 'elastic-textarea.html',
})
export class ElasticTextareaPage {
    text = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt ut labore\net dolore magna aliqua. Ut enim ad minim veniam,";
    text2 = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt ut labore\net dolore magna aliqua. Ut enim ad minim veniam,";
    loaded:boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ElasticTextareaPage');
        this.loaded = true;
    }

}
