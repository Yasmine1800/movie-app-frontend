import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { FavoriteService } from '../favorite.service';
import {  logoutUser } from '../../firebase';
import { UserService } from '../user.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  public favoritesCount: number = 0;
  public username! : string;

  constructor(private router: Router,private service: FavoriteService, private userService: UserService) {}


    handleViewFavorites() {
      this.router.navigate(['user/favorites']);
    }

    ngOnInit(): void {
      this.service.getFavorites().subscribe(data => {
        this.favoritesCount = data.length;
      })

      this.userService.getUser().subscribe((user) => {
        this.username = user?.username as string;
      })
    }

    handleClick() {
      this.router.navigate(['films']);
    }

    async logout(){
      await logoutUser()
      this.userService.setUser(null);
      this.service.clearFavorites();
    }
}
