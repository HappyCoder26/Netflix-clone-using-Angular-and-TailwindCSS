import { Component, OnInit } from '@angular/core';
import { Interface } from 'readline';
import { AuthServiceService } from './core/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private autService:AuthServiceService) {

  }
  ngOnInit() {
    this.autService.getCurrentActiveUser();
  }
}
