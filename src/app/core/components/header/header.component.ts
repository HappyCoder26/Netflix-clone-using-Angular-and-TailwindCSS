import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links:string[] = ['Home', 'TV Shows', 'News & Popular', 'My List', 'Browse by Language']

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  onSignOut() {
    this.authService.logOut();
  }

}
