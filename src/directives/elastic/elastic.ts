import { Input, OnChanges, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
@Directive({
    selector: '[elastic]' // Attribute selector
})
export class ElasticDirective implements OnInit, OnChanges{
    @Input("text") text;
    constructor(private el: ElementRef) {
    }
    public ngOnInit() {
        setTimeout(() => {
            this.adjust()
        }, 30);
    }

    @HostListener('input', ['$event.target']) 
    public onInput() {
        this.adjust();
    }

    ngOnChanges(changes:any) {
        if(changes["text"]){
            setTimeout(() => {
                this.adjust();
            }, 30);
        }
    }
    private adjust(): void {
        let ta = this.el.nativeElement.querySelector('textarea');
        if(!ta){
            ta = this.el.nativeElement;
        }
        if (ta) {
            let overflow = ta.style.overflow;
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';

            if (overflow !== ta.style.overflow) {
                ta.style.overflow = overflow;
            }
        }
    }
}
