import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from '../environment/environment';

type FormFields = {
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  formFields !: FormFields;
 

  constructor(private http : HttpClient, private router: Router, private userService : UserService) {}

  handleChange(event: Event, field : string) {
    const value = (event.target as HTMLInputElement).value;
    this.formFields = {
      ...this.formFields,
      [field]: value
    }
  }

  handleSubmit(event : Event) {
    event.preventDefault()
    this.http.post(`${environment.restLink}/user/login`, this.formFields)
    .subscribe((res) => {
      this.userService.setUser(res)
      this.router.navigate(['films']);
    })

  }
}
