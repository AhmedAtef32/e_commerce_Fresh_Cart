import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { delay } from 'rxjs';

@Component({
  selector: 'app-intro-website',
  imports: [],
  templateUrl: './intro-website.component.html',
  styleUrl: './intro-website.component.scss',
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown ,{
      params: { timing: 2   }
    }))])
  ],
})
export class IntroWebsiteComponent {
  fadeInDown: any;
}
