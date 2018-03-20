import { Component, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Gesture, Content } from 'ionic-angular';

// Providerからの移植
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'zoom-area',
    templateUrl: 'zoom-area.html',
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({ opacity: 1, display: 'block' })),
            state('hidden', style({ opacity: 0, display: 'none' })),
            transition('shown => hidden', animate('300ms')),
            transition('hidden => shown', animate('300ms')),
        ])
    ],
})
export class ZoomAreaComponent implements OnChanges, AfterViewInit{
    // START:Providerからの移植
    SCROLL_STATE = {
        NORMAL: 'scrollNormal',
        COLAPSED: 'scrollColapsed'
    };
    private _onScroll = new Subject<any>();
    onScroll$ = this._onScroll.asObservable();

    private _scrollState = new Subject<any>();
    scrollState$ = this._scrollState.asObservable();

    private _centerChanged = new Subject<any>();
    centerChanged$ = this._centerChanged.asObservable();
    // END:Providerからの移植
    @ViewChild('zoomAreaRoot') zoom;
    @ViewChild(Content) content: Content;

    @Output() afterZoomIn = new EventEmitter<any>();
    @Output() afterZoomOut = new EventEmitter<any>();

    @Input() controls: boolean;
    @Output() controlsChanged = new EventEmitter<boolean>();

    @Input() scale: number;
    @Output() scaleChanged = new EventEmitter<number>();

    zoomControlsState;
    zoomRootElement;
    gesture;

    constructor () {
        this.zoomControlsState = 'hidden';
    }

    ngOnChanges (changes: SimpleChanges) {
        if ('controls' in changes) {
            let showControls = changes['controls'];

            if (showControls && showControls.currentValue) {
                this.zoomControlsState = 'shown';
            } else {
                this.zoomControlsState = 'hidden';
            }
        }

        if ('scale' in changes) {
            let scaleValue = changes['scale'];

            if (scaleValue && scaleValue.currentValue && scaleValue.currentValue === 1) {
                this.zoomReset();
            }
        }
    }

    ngAfterViewInit () {
        this.content.ionScroll.subscribe((data)=>{
            this.notifyScroll(data);
        });

        this._pinchZoom(this.zoom.nativeElement, this.content);

        // Watch for user setCenter call
        let self = this;
        this.centerChanged$.subscribe(coords => {
            if (self.zoomConfig.scale === 1) {
                return;
            }

            self.setCoor(coords.x, coords.y);
            self.transform(coords.x, coords.y);
        });
    }

    zoomConfig = {
        ow: 0,
        oh: 0,
        original_x: 0,
        original_y: 0,
        max_x: 0,
        max_y: 0,
        min_x: 0,
        min_y: 0,
        x: 0,
        y: 0,
        last_x: 0,
        last_y: 0,
        scale: 1,
        base: 1,
    };

    toggleZoomControls () {
        this.zoomControlsState = this.zoomControlsState === 'shown' ? 'hidden' : 'shown';
    }

    zoomIn () {
        this.zoomConfig.scale += 1;

        if (this.zoomConfig.scale > 1) {
            this.notifyScrollState(this.SCROLL_STATE.COLAPSED);
        }

        if (this.zoomConfig.scale > 4) {
            this.zoomConfig.scale = 4;
        }

        this.transform();
        this.afterZoomIn.emit();
    }

    zoomOut (reset?) {
        if (!this.zoomRootElement) {
            return;
        }

        this.zoomConfig.scale -= 1;

        if (this.zoomConfig.scale < 1) {
            this.zoomConfig.scale = 1;
        }

        if (this.zoomConfig.scale === 1) {
            reset = true;
            this.notifyScrollState(this.SCROLL_STATE.NORMAL);
        }

        reset ? this.transform(0.1, 0.1) : this.transform();

        this.afterZoomOut.emit();
    }

    zoomReset () {
        this.zoomConfig.scale = 1;
        if (this.content && this.content.scrollTop) {
            this.content.scrollTop = 0;
        }
        this.zoomOut(true);
    }

    private _pinchZoom(elm: HTMLElement, content: Content): void {
        this.zoomRootElement = elm;
        this.gesture = new Gesture(this.zoomRootElement);

        for (let i = 0; i < elm.children.length; i++) {
            let c = <HTMLElement>elm.children.item(i);
            this.zoomConfig.ow = c.offsetWidth;
            this.zoomConfig.oh += c.offsetHeight;
        }

        this.zoomConfig.original_x = content.contentWidth - this.zoomConfig.ow;
        this.zoomConfig.original_y = content.contentHeight - this.zoomConfig.oh;
        this.zoomConfig.max_x = this.zoomConfig.original_x;
        this.zoomConfig.max_y = this.zoomConfig.original_y;
        this.zoomConfig.base = this.zoomConfig.scale;

        this.gesture.listen();
        this.gesture.on('pan', this.onPan.bind(this));
        this.gesture.on('panend', this.onPanend.bind(this));
        this.gesture.on('pancancel',this. onPanend.bind(this));
        this.gesture.on('tap', this.onTap.bind(this));
        this.gesture.on('pinch', this.onPinch.bind(this));
        this.gesture.on('pinchend', this.onPinchend.bind(this));
        this.gesture.on('pinchcancel', this.onPinchend.bind(this));
    }

    onPan(ev) {
        if (this.zoomConfig.scale === 1) {
            return;
        }

        this.setCoor(ev.deltaX, ev.deltaY);
        this.transform();
    }

    onPanend() {
        this.zoomConfig.last_x = this.zoomConfig.x;
        this.zoomConfig.last_y = this.zoomConfig.y;
    }

    onTap(ev) {
        if (ev && ev.tapCount > 1) {
            let reset = false;
            this.zoomConfig.scale += .5;
            if (this.zoomConfig.scale > 2) {
                this.zoomConfig.scale = 1;
                reset = true;
            }

            this.setBounds();
            reset ? this.transform(this.zoomConfig.max_x/2, this.zoomConfig.max_y/2) : this.transform();
        }
    }

    onPinch(ev) {
        this.zoomConfig.scale = this.zoomConfig.base + (ev.scale * this.zoomConfig.scale - this.zoomConfig.scale)/this.zoomConfig.scale
        this.setBounds();
        this.transform();
    }

    onPinchend(ev) {
        if (this.zoomConfig.scale > 4) {
            this.zoomConfig.scale = 4;
        }

        if (this.zoomConfig.scale < 1) {
            this.zoomConfig.scale = 1;
        }

        this.zoomConfig.base = this.zoomConfig.scale;
        this.setBounds();
        this.transform(); 
    }

    setBounds() {
        let scaled_x = Math.ceil((this.zoomRootElement.offsetWidth * this.zoomConfig.scale - this.zoomRootElement.offsetWidth) / 2);
        let scaled_y = Math.ceil((this.zoomRootElement.offsetHeight * this.zoomConfig.scale - this.zoomRootElement.offsetHeight) / 2);

        let overflow_x = Math.ceil(this.zoomConfig.original_x * this.zoomConfig.scale - this.zoomConfig.original_x);
        let overflow_y = Math.ceil(this.zoomConfig.oh * this.zoomConfig.scale - this.zoomConfig.oh);

        this.zoomConfig.max_x = this.zoomConfig.original_x - scaled_x + overflow_x;
        this.zoomConfig.min_x = 0 + scaled_x;

        this.zoomConfig.max_y = this.zoomConfig.original_y + scaled_y - overflow_y;
        this.zoomConfig.min_y = 0 + scaled_y;

        this.setCoor(-scaled_x, scaled_y);
    }

    setCoor(xx: number, yy: number) {
        const compensation = this.zoomConfig.scale === 2 ? 1.05 : (this.zoomConfig.scale / 1.25);
        this.zoomConfig.x = Math.min(Math.max((this.zoomConfig.last_x + xx), this.zoomConfig.max_x * compensation), this.zoomConfig.min_x * compensation);
        this.zoomConfig.y = Math.min(Math.max((this.zoomConfig.last_y + yy), this.zoomConfig.max_y * compensation), this.zoomConfig.min_y * compensation);
    }

    transform(xx?: number, yy?: number) {
        this.zoomRootElement.style.transform = `translate3d(${xx || this.zoomConfig.x}px, ${yy || this.zoomConfig.y}px, 0) scale3d(${this.zoomConfig.scale}, ${this.zoomConfig.scale}, 1)`;
    }

    // 以下、Providerからの移植
    notifyScroll (data) {
        this._onScroll.next(data);
    }

    notifyScrollState (data) {
        this._scrollState.next(data);
    }
    setCenter (x: number, y: number) {
        this._centerChanged.next({x: x, y: y});
    }
}
