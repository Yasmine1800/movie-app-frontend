import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { film } from '../../model/film.model';
import { FavoriteService } from '../favorite.service';
import { FilmItemComponent } from "../film-item/film-item.component";

@Component({
    selector: 'app-view-favorites',
    standalone: true,
    templateUrl: './view-favorites.component.html',
    styleUrl: './view-favorites.component.scss',
    imports: [CommonModule, FilmItemComponent, RouterModule]
})
export class ViewFavoritesComponent {

  films: film[] = [];

  constructor(
    private favoriteService: FavoriteService) { }

    ngOnInit(): void {
      this.favoriteService.getFavorites().subscribe((data) => {
        this.films = data;
      })

    }
}
