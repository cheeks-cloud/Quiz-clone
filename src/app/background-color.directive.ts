import { Directive, Input,ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  @Input() isCorrect:Boolean = false;

  constructor( private elem:ElementRef, private render: Renderer2) { }

   @HostListener( 'click') answer(){
     if( this.isCorrect){
    
      this.render.setStyle(this.elem.nativeElement,'background','green')
      this.render.setStyle(this.elem.nativeElement,'color','White')
      this.render.setStyle(this.elem.nativeElement,'border','2px solid blue')

     }else{
      this.render.setStyle(this.elem.nativeElement,'background','grey')
      this.render.setStyle(this.elem.nativeElement,'color','white')
      this.render.setStyle(this.elem.nativeElement,'background','2px solid blue')
     }
   }









}
