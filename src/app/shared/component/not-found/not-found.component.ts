import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrl: './not-found.component.scss',
  imports: [ButtonModule, RouterLink]
})
export class NotFoundComponent {

}
