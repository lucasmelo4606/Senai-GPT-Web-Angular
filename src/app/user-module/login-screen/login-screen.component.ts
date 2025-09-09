import { ChangeDetectorRef, Component, ɵɵinvalidFactory } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

  loginForm: FormGroup;

  emailErrorMessage: string;
  passordErrorMessage: string;
  statusCorreto: string;
  credencialError: string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    //sera executado quando a tela iniciar

    //iniciar o frmulário
    //criar o campo obrigatório de email
    //criar o campo obrigatório de password
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.emailErrorMessage = "";
    this.passordErrorMessage = "";
    this.statusCorreto = "";
    this.credencialError = "";


  }

  async onLoginClick() {

    this.emailErrorMessage = "";
    this.passordErrorMessage = "";
    this.statusCorreto = "";
    this.credencialError = "";

    if (this.loginForm.invalid) {

      if (this.loginForm.value.email == "") {

        this.emailErrorMessage = " e-mail obrigatório";

      } 
      
      if (this.loginForm.value.password == "") {

        this.passordErrorMessage = " senha obrigatória";

      }


     
      this.cd.detectChanges(); //forçar uma atualização da tela.
      return;
    }

    const { email, password } = this.loginForm.value;

    ("Botão de login clicado.")
    console.log("Email", this.loginForm.value.email);
    console.log("Password", this.loginForm.value.password);

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
      method: "POST",
      headers: {

        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })

    });

    console.log("STATUS CODE", response.status)



    if (response.status >= 200 && response.status <= 299) {
      this.statusCorreto = " login realizado com sucesso"

      let json =await response.json();

      console.log( "JSON", json)
      let meuToken = json.accessToken;
      let userId = json.user.id;

      localStorage.setItem("meuToken", meuToken)
      localStorage.setItem("meuId", userId)

      window.location.href = "chat";

    } else {

      this.credencialError = " senha ou e-mail incorreto"
    }



  }


}




