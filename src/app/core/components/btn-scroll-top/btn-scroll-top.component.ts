import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-btn-scroll-top',
  imports: [],
  templateUrl: './btn-scroll-top.component.html',
  styleUrl: './btn-scroll-top.component.scss'
})
export class BtnScrollTopComponent {


@ViewChild('scrollTop') scrollTop!:ElementRef;
@HostListener('window:scroll')
 ShowBtn(){

  const scrollY = window.scrollY;

  if (scrollY < 100) {
    this.scrollTop.nativeElement.classList.add('opacity-0');
    this.scrollTop.nativeElement.classList.remove('opacity-100');

  }else{
    this.scrollTop.nativeElement.classList.remove('opacity-0');
    this.scrollTop.nativeElement.classList.add('opacity-100');

  }

  }


 goToTop(){
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
 }

}
