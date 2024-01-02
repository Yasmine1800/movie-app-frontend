import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { getCurrentUser } from '../firebase';
import { ListFilmComponent } from "./list-film/list-film.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { UserService } from './user.service';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule,
              RouterOutlet, 
              ListFilmComponent, 
              HttpClientModule, 
              NgxEditorModule, 
              NavBarComponent,
             
            ]
})
export class AppComponent {
  title  = 'movie-app';

  constructor( private userService : UserService) {}

  async ngOnInit() {
    const user = await getCurrentUser()
    if(user) {
      this.userService.getUserById(user?.uid).subscribe(user=> {
        this.userService.setUser(user);
      });


    } 
  }
}
