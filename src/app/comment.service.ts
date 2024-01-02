import { Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';


@Injectable({
    providedIn: 'root'
})

export class CommentService {

    comment!: Comment;
    
    constructor(private http: HttpClient) {

    }


    setComment(comment : Comment) {
        this.comment = comment;
    }

     
    addComment(comment : Comment ) : Observable<any>{
        return this.http.post(`${environment.restLink}/user/comment/add`, comment)
    }

    getCommentsByFilmId(filmId : string) : Observable<any>{
        
        return this.http.get(`${environment.restLink}/film/comments/${filmId}`)
    }


}