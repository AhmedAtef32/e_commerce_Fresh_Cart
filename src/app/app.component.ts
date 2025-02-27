import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { BtnScrollTopComponent } from "./core/components/btn-scroll-top/btn-scroll-top.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, BtnScrollTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Final_Project';

  private  _flowbiteService = inject(FlowbiteService)

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }


}
