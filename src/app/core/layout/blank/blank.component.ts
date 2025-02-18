import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
