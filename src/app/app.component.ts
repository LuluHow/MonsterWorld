import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected: Boolean = false;
  private sequence: string[];
  private konamiCode: string[];
  isKonamiExecuted: Boolean = false;

  constructor() {
    this.sequence = [];
    this.konamiCode = [
      'arrowup', 'arrowup',
      'arrowdown', 'arrowdown',
      'arrowleft', 'arrowright',
      'arrowleft', 'arrowright',
      'b', 'a'
    ];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key) {
      this.sequence.push(event.key.toLowerCase());
      if (this.sequence.length > this.konamiCode.length) {
        this.sequence.shift();
      }
      if (this.isKonamiCode()) {
        this.isKonamiExecuted = true;
      }
    }
  }

  isKonamiCode(): boolean {
    return this.konamiCode.every((code: string, index: number) => code === this.sequence[index]);
  }

  ngOnInit() {
    let checkConnection = setInterval(() => {
      let isConnected = JSON.parse(localStorage.getItem("currentMonster")  || '{}');
      if(isConnected.login)
      {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    }, 500);
  }
}