import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { loginUser } from '../../firebase';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  text = '';
  
  email = new FormControl('',
  [Validators.required,
    Validators.email,]);
    
    password = new FormControl('',
    [Validators.required,
      Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]);
      
      loginForm = new FormGroup({
        email: this.email,
        password: this.password,
      });
      
  constructor(private userService : UserService, private router : Router) { }


  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
  
    this.loginForm.patchValue({ [name]: value });
  }

  async login(event: Event){
    event.preventDefault();
    const {email,password} = this.loginForm.value;
    try {
      const userCred  = await loginUser(
        email as string,
        password as string
      );
      this.userService.getUserById(userCred!.user.uid).subscribe(
        (user) => {
          this.userService.setUser(user);
          this.router.navigate(['/films']);
        }
      );

      
      
    } catch (error: any) {
      if(error.code === 'auth/invalid-credential') {
        this.text = 'Invalid Email or Password';
      }
    }
  }

  handleContinueAsGuest() {
    this.router.navigate(['/films']);
  }

}
