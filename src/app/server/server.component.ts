import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  //selector: '.app-servers',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverId: number = 10;
  serverStatus: string = "offline";
  allowNewServer: boolean = false;
  serverCreationStatus = "server was not created";
  serverName ="";
  buttonClicked = false;
  showSuccesMessage = false;
  servers = [];

  getServerStatus() : string {
    return this.serverStatus;
  }
  constructor() { 
    this.serverStatus = Math.random() > 0.5 ? 'offline' : 'online';
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  ngOnInit() {
  }
  onCreateServer() {
    this.buttonClicked = true;
    this.serverCreationStatus = "server is created and serverName is "+ this.serverName;
    setTimeout(() => {
      this.showSuccesMessage = true;
    }, 2000);
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  getColor() {
    return this.serverStatus == 'offline' ? 'mistyrose' : 'palegreen';
  }
}
