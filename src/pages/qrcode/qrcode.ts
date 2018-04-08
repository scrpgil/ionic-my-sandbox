import { ViewChild, Component, NgZone } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import jsQR from "jsqr";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@IonicPage({
    name:'qrcode',
    segment:'qrcode'
})
@Component({
    selector: 'page-qrcode',
    templateUrl: 'qrcode.html',
})
export class QrcodePage {
    @ViewChild('camera') camera: any;
    scannedText:string = "";
    showing:boolean = false;
    obs:any;
    canvasElement;
    canvas;
    readonly medias: MediaStreamConstraints = {audio: false, video:  { facingMode: "environment" } };
    constructor(
        public navCtrl: NavController,
        public zone: NgZone,
        public plt: Platform,
        public navParams: NavParams
    ) {
    }

    ionViewDidEnter() {
        this.canvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = this.canvasElement.getContext("2d");
        this.obs = Observable.interval(1).subscribe((x) => {
            if(this.showing){
                this.canvasElement.hidden = false;
                this.canvasElement.height = this.camera.nativeElement.videoHeight;
                this.canvasElement.width = this.camera.nativeElement.videoWidth;
                this.canvas.drawImage(this.camera.nativeElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
                this.canvas.width = this.camera.nativeElement.videoWidth;
                this.canvas.height = this.camera.nativeElement.videoHeight;
                if(this.canvas.width > 0){
                    console.log(this.canvas);
                    let imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
                    var code = jsQR(imageData.data, imageData.width, imageData.height);
                    if(code){
                        this.scannedText = code.data;
                    }
                }
            }
        });
    }
    showCamera(){
        this.showing = !this.showing;
        if(this.showing){
            window.navigator.mediaDevices.getUserMedia(this.medias)
            .then(stream => {
                this.camera.nativeElement.srcObject = stream;
                this.camera.nativeElement.setAttribute("playsinline", true);
            })
            .catch(error => {
                console.error(error);
                alert(error);
            });
        }else{
            this.camera.nativeElement.pause(); 
            const track = this.camera.nativeElement.srcObject.getTracks()[0] as MediaStreamTrack;;
            track.stop(); 
        }
    }


    drawLine(begin, end, color) {
        this.canvas.beginPath();
        this.canvas.moveTo(begin.x, begin.y);
        this.canvas.lineTo(end.x, end.y);
        this.canvas.lineWidth = 4;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
    }
}
