import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder){
    //sera executado quando a tela iniciar

    //iniciar o frmulário
    //criar o campo obrigatório de email
    //criar o campo obrigatório de password
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [ Validators.required]]
    });


  }

  onLoginClick() {

    alert("Botão de login clicado.")
    console.log("Email", this.loginForm.value.email);
    console.log("Password", this.loginForm.value.password);
  }
}




