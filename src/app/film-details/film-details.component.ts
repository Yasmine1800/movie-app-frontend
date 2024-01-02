import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { film } from '../../model/film.model';
import { FilmService } from '../film.service';
import { HttpClientModule } from "@angular/common/http";
import { ViewCommentsComponent } from "../view-comments/view-comments.component";
import { FavoriteService } from '../favorite.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-film-details',
  standalone: true,
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
  imports: [CommonModule, HttpClientModule, ViewCommentsComponent]
})
export class FilmDetailsComponent {

  film: film | undefined;
  filmId: number | undefined;
  showCommentEditor = false;
  favoriteBtnText = "Add to favorites";
  favoriteIds: number[] = [];


  constructor(
    private router: Router, private route: ActivatedRoute,
    private filmService: FilmService, private favoriteService: FavoriteService,
    private userService: UserService) { }

  toggleCommentEditor() {
    this.showCommentEditor = !this.showCommentEditor;
  }

  handleAddToFavorites() {

    this.userService.getUser().subscribe((user) => {
      if (!user?.userId) {
        this.router.navigate(['/login']);
        return;
      }
      if (this.favoriteIds.includes(this.filmId!)) {
        this.favoriteService.removeFavorite(this.filmId!)
        this.favoriteBtnText = "Add to favorites";
      } else {
        this.favoriteService.addFavorite(this.film!)
        this.favoriteBtnText = "Remove from favorites";
      }
    });

  }



  ngOnInit(): void {
    this.filmId = Number(this.route.snapshot.params['id']);
    this.filmService.getFilmById(this.filmId!).subscribe((data: any) => {
      this.film = {
        id: data.id,
        title: data.title,
        year: data.release_date,
        description: data.overview,
        imageUrl: data.poster_path,
        genre: data.genres
      }
    })
    this.userService.getUser().subscribe((user) => {
      if (!user?.userId) return
      this.favoriteService.getFavorites().subscribe((data: any) => {
        console.log(data);
        this.favoriteIds = data.map((film: any) => film.id);
        if (data.map((film: any) => film.id).includes(this.filmId!)) {
          this.favoriteBtnText = "Remove from favorites";
        } else {
          this.favoriteBtnText = "Add to favorites";
        }
      })
    })

    //this.getFavoriteIds();
  }



}
