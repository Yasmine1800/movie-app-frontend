import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiLink = "https://api.themoviedb.org/3/movie/popular"
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {

  }

  getFilms(page : number) : Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`)
  }

  getFilmById(id: number) : Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
  }

  getFilmByKeyword(keyword: string, page : number) : Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${keyword}&page=${page}`)
  }
  
}
