import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent {
  
  newUserLoginForm:FormGroup;


  emailErrorMessage: string;
  passordErrorMessage: string;
  nameErrorMessage: string;
  confirmedPassword: string;

  constructor(private fb: FormBuilder){

    
    this.nameErrorMessage= "";
    this.emailErrorMessage = "";
    this.passordErrorMessage = "";
    this.confirmedPassword = "";


  this.newUserLoginForm = this.fb.group({
    name: ["", [ Validators.required]],
    email: ["", [ Validators.required]],
    password: ["", [ Validators.required]],
    confirmePassowrd: ["", [ Validators.required]],

    
  })
  
}


  async newcadastro() {
    if (this.newUserLoginForm.value.name == "" ){
      this.nameErrorMessage = "nome obrigatório"
    
      return
    
    }if (this.newUserLoginForm.value.email == "" ){
      this.emailErrorMessage = "e-mail obrigatório"
    
      return
    
    }if (this.newUserLoginForm.value.password == "" ){
      this.passordErrorMessage = "senha obrigatória"
    
      return
    
    }if (this.newUserLoginForm.value.confirmePassowrd != this.newUserLoginForm.value.password ){
      this.confirmedPassword = "Senhas não confere"
      return
    
    }

    
    const token = localStorage.getItem("meuToken");// pega item do local storage

  let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
    method: "POST",
        headers: {
        
      "Content-Type": "application/json",
      "authorization": `bearer ${token}`
    },
    
    body: JSON.stringify({
      name: this.newUserLoginForm.value.name,
      email: this.newUserLoginForm.value.email,
      password: this.newUserLoginForm.value.password,
      confirmePassowrd: this.newUserLoginForm.value.confirmePassowrd,
    })

  });
  
  





}


}






