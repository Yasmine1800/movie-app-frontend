import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { film } from '../../model/film.model';
import { FilmItemComponent } from "../film-item/film-item.component";
import { FilmService } from '../film.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { mapFilmData } from '../map-films.service.';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
    selector: 'app-list-film',
    standalone: true,
    templateUrl: './list-film.component.html',
    styleUrl: './list-film.component.scss',
    imports: [CommonModule, FormsModule, FilmItemComponent, SearchBarComponent, NavBarComponent, PaginationComponent]
})

export class ListFilmComponent implements OnInit {
  page : number = 1;
  films: film[] = [];

  constructor(private filmService: FilmService, private scroller: ViewportScroller) { }

  ngOnInit(){
    this.fetchFilms(null);
  }

  onSearchFieldChange(searchField: string | null): void {
    this.page = 1;
    this.fetchFilms(searchField);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchFilms(null);
    this.scroller.scrollToPosition([0, 0]);
  }
  
  fetchFilms(searchField: string | null): void {
    if (searchField && searchField !== '') {
      this.filmService.getFilmByKeyword(searchField, this.page).subscribe((data: any) => {
        this.films = data.results.map((film: any) => mapFilmData(film));
      });
    } else {
      this.filmService.getFilms(this.page).subscribe((data: any) => {
        this.films = data.results.map((film: any) => mapFilmData(film));
      });
    }
  }
}
