import { Routes} from '@angular/router';
import { ListFilmComponent } from './list-film/list-film.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ViewFavoritesComponent } from './view-favorites/view-favorites.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'films', component: ListFilmComponent},
    {path:'films/:id', component: FilmDetailsComponent },
    {path:'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user/favorites', component: ViewFavoritesComponent},
    {path: '',component: UserLoginComponent},
    {path:'**',redirectTo:'/not-found'},
];

