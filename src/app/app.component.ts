import { Component, OnInit } from '@angular/core';
import { AuthService } from './mix/components/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor( private aus : AuthService  ) {
  }
  ngOnInit(): void {
    const token = localStorage.getItem("USER")
    if(token){
      this.aus.decodeToken(token)
      }
  }
}
