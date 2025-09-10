import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent {
  
  newUserLoginForm: FormGroup;

  constructor(private fb: FormBuilder){
  this.newUserLoginForm = this.fb.group({
    name: ["", [ Validators.required]],
    email: ["", [ Validators.required]],
    password: ["", [ Validators.required]],
    confimepassword: ["", [ Validators.required]],

  })
   }
  async newcadastro() {

    


  let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
    method: "POST",
    headers: {

      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name: this.newUserLoginForm.value.name,
      email: this.newUserLoginForm.value.email,
      password: this.newUserLoginForm.value.password,
      confirmePassword: this.newUserLoginForm.value.confimepassword
    })

  });
    

  }
  
}






