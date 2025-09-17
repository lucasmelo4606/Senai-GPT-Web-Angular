import { CommonModule } from '@angular/common';
import { HttpClient,  } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';


interface IChat{
  chatTitle: string;
  id: number;
  userId: string
}
interface IMessage{
  chatId: number;
  id: number;
  text: string;
  userId: string;
}

@Component({
  selector: 'app-chat-screen',
  imports: [ CommonModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {

  chats: IChat[];
  chatSelecionado: IChat;
  messages: IMessage [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {// constroi a classe
    //Inicialização de variaveis

    this.chats = [];
    this.chatSelecionado = null!;
    this.messages =[];


  }
  ngOnInit() { //executado quando o Angula esta pronto para rodar

    // Buscar dados na API
    this.getChats();

  }

  async getChats() {
    // Metodo que busca os chats da API

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats",
      {
        headers: {
         "Authorization": "Bearer "+ localStorage.getItem("meuToken")

        }
      }
    ))
      if(response){
        this.chats = response as [];
      
      }else{
        console.log("erro ao buscar ")
      }

    this.cd.detectChanges();
  }

  async onChatClick(chatClicado: IChat){
    console.log("chat clicado", chatClicado)
    this.chatSelecionado= chatClicado;

    //lógica para buscar as mensagens
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id,
      {
        headers: {
         "Authorization": "Bearer "+ localStorage.getItem("meuToken")

        }
      }));
      console.log("MESSAGENS", response)
      this.messages = response as IMessage[];
    
  }

}