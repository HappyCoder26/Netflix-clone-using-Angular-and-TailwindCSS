import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedUser!: User | null;
  private userSubscription!: Subscription;

  links: string[] = ['Home', 'TV Shows', 'News & Popular', 'My List', 'Browse by Language']

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((value) => {
      // Handle the emitted value here
      this.loggedUser = value;
    });

  }

  onSignOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  toggleMenu(): void {
    const menuDialog = document.getElementById('menuDialog');
    if (menuDialog) {
      menuDialog.style.display = menuDialog.style.display === 'none' ? 'block' : 'none';
    }
  }

  logout() {
    const menuDialog = document.getElementById('menuDialog');
    if (menuDialog) {
      menuDialog.style.display = 'none';
      this.onSignOut();
    }
  }
}
