import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface IChat {
  chatTitle: string;
  id: number;
  userId: string;
}

interface IMessage {
  chatId: number;
  id: number;
  text: string;
  userId: string;
}

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreen {
  chats: IChat[];
  chatSelecionado: IChat;
  mensagens: IMessage[];
  mensagemUsuario = new FormControl("")

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];
  }

  ngOnInit() {
    this.getChats();
  }

  async getChats() {
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));
    if (response) {
      this.chats = response as [];
    }
    else {
      console.log("Erro ao bsucar os chats");
    }
  }

  async onChatClick(chatClicado: IChat) {
    console.log("Chat clicado", chatClicado);
    this.chatSelecionado = chatClicado;
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));
    console.log("MENSAGENS", response);
    this.mensagens = response as IMessage[]; // Cast adicionado para garantir o tipo correto

    this.cd.detectChanges();
  }
  async enviarMensagem() {
    let novaMensagemUsuario = {
      chatId: this.chatSelecionado,
      userId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value
    };

    let novaMensagemUsuarioResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
      headers: {
        "content_type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      },
    }));
    //atualizar as mensagens da tela
    await this.onChatClick(this.chatSelecionado);

    // enviar as mensagens do usuario para IA responder
    let respostaIAresponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      "contents": [
        {
          "parts": [
            {
              "text": this.mensagemUsuario.value + ", me dÊ uma resposta objetiva"
            }
          ]
        }
      ]

    },
  {
    headers:{
      "content-type": "application/json",
      "x-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
    }
  })) as any;

  let newMessageIA = {
    chatId: this.chatSelecionado.id ,
    userId: "chatbot",
    text: respostaIAresponse.candidates[0].content.parts[0].text
     }
    // 3 - salva 
    let newMesageIAResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", newMessageIA, {
      headers: {
        "content_type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")

      },
    }));
    //atualizar as mensagens da tela
    await this.onChatClick(this.chatSelecionado);
  }
  
}