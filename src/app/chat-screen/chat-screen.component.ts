import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


interface IChat{
  chatTitle: string;
  id: number;
  userId: string
}

@Component({
  selector: 'app-chat-screen',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {

  chats: IChat[];

  constructor(private http: HttpClient) {// constroi a classe
    //Inicialização de variaveis

    this.chats = [];

  }
  ngOnInit() { //executado quando o Angula esta pronto para rodar

    // Buscar dados na API
    this.getChats();

  }

  async getChats() {
    // Metodo que busca os chats da API

    let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats",
      {
        headers: {
         "Authorization": "Bearer "+ localStorage.getItem("meuToken")

        }
      }
    ).toPromise();
      if(response){
        this.chats = response as [];
      
      }else{
        console.log("erro ao buscar ")
      }

    
  }

}