import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { registerUser } from '../../firebase';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  text = '';
  displayName = new FormControl('', 
  [Validators.required, 
  Validators.minLength(3)]);
  
  email = new FormControl('',
  [Validators.required,
  Validators.email,]);

  password = new FormControl('',
  [Validators.required,
  Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]);

  confirmPassword = new FormControl('',
  [Validators.required,]);
  

  constructor(private userService : UserService, private router :  Router) { }

  registerForm = new FormGroup({
    displayName: this.displayName,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
  
    this.registerForm.patchValue({ [name]: value });
  }

  async register(event: Event){
    event.preventDefault();
    const {displayName,email,password,confirmPassword} = this.registerForm.value;
    if(password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      const userCred = await registerUser(
        email as string,
        password as string
      )

      this.userService.saveUser({
        userId: userCred?.user?.uid as string,
        username: displayName as string,
        email: email as string,
        password: password as string,
      }).subscribe((user : any) => {
        this.userService.setUser(user);
        this.router.navigate(['films']);
      })


    } catch (error : any) {
      if(error.code === "auth/email-already-in-use"){
        this.text = 'Email already in use';
      }
    }



    // console.log(userCred?.user?.uid);

    
     
  }

}
