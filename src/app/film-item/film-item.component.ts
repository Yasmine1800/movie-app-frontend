import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { film } from '../../model/film.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-film-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './film-item.component.html',
  styleUrl: './film-item.component.scss'
})
export class FilmItemComponent {
  @Input() film! : film
}
