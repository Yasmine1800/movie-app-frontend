import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { film } from '../model/film.model';
import { FilmService } from './film.service';
import { UserService } from './user.service';
import { environment } from './environment/environment';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private favoriteSubject = new BehaviorSubject<film[]>([]);
    favorites$ = this.favoriteSubject.asObservable();


    private favoriteIdsSubject = new BehaviorSubject<string[]>([]);
    favoriteIds$ = this.favoriteIdsSubject.asObservable();


    constructor(private http: HttpClient, private filmService: FilmService, private userService: UserService) {

    }
    clearFavorites() {
        this.favoriteSubject.next([]);
    }

    addFavorite(film: film) {
        this.userService.getUser().subscribe((user) => {
            if(!user?.userId) return
            this.http.post(`${environment.restLink}/user/favorite/add/${user?.userId}/${film.id}`, null).subscribe(() => {
                const favorites = this.favoriteSubject.getValue();
                if(!favorites.map(film => film.id).includes(film.id)){
                    favorites.push(film);
                }
    
                this.favoriteSubject.next(favorites);
            })

        });
    }

    getFavorites() {
        this.userService.getUser().subscribe((user) => {
            console.log(user?.userId)
            if(!user?.userId) return
            this.http.get(`${environment.restLink}/user/favorite/${user.userId}`).subscribe((data) => {
                const moviesIds = data as string[];
                const filmObservables = moviesIds.map((id) => {
                    return this.filmService.getFilmById(+id).pipe(
                        map(film => ({
                            id: film.id,
                            title: film.title,
                            year: film.release_date,
                            description: film.overview,
                            imageUrl: film.poster_path,
                            genre: film.genres
                        }))
                    );
                });
    
                forkJoin(filmObservables).subscribe((films) => {
                    const favorites = films;
                    this.favoriteSubject.next(favorites);
                });
            })
        });
        return this.favorites$
    }

    getFavoritesIds(): Observable<string[]> {
        this.userService.getUser().subscribe((user) => {
            if(!user?.userId) return
            this.http.get<string[]>(`${environment.restLink}/user/favorite/ids/${user?.userId}`).subscribe((data: string[]) => {
                const favoritesIds = data;
                this.favoriteIdsSubject.next(favoritesIds);
            });
        })
        return this.favoriteIds$;
    }

    removeFavorite(filmId: number) {
        this.userService.getUser().subscribe((user) => {
            if(!user?.userId) return
            this.http.post(`${environment.restLink}/user/favorite/delete/${user?.userId}/${filmId}`, filmId).subscribe(() => {
                const favorites = this.favoriteSubject.getValue();
                this.favoriteSubject.next(favorites.filter(film => film.id !== filmId));
            })
        })
    }



}
