import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';
import { Comment } from '../../model/comment.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-comments',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './view-comments.component.html',
  styleUrl: './view-comments.component.scss'
})
export class ViewCommentsComponent {
  editorContent: string = '';
  comment!: Comment;

  @Input() filmId!: number;
  comments: any[] = [];

  constructor(
    private commentService: CommentService, 
    private userService: UserService,
    private route : Router) { }

  ngOnInit(): void {

    this.commentService.getCommentsByFilmId(this.filmId.toString()).subscribe((comments: any[]) => {
      this.comments = [];
      for (const comment of comments) {
        this.userService.getUserById(comment.userId).subscribe((user: any) => {
          this.comments.push({
            userName: user.username,
            commentBody: comment.commentBody
          } as any);

        });
      }
    });
  }

  handleSubmitComment(commentBody: string) {

    this.userService.getUser().subscribe((user) => {
      if(!user?.userId){
        this.route.navigate(['/login']);
        return;
      }
      const comment: Comment = {
        filmId: this.filmId,
        userId: user?.userId  as string,
        commentBody: commentBody
      };
      this.commentService.addComment(comment).subscribe(() => {
          this.comments.push({
            userName: user?.username,
            commentBody: comment.commentBody
          } as any);
      })

    })


  }


}
