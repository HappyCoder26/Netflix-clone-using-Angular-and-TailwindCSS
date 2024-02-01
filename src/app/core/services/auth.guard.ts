import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthServiceService, private router:Router, private movieService:MovieService){
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const url = state.url;
      return this.authService.user.pipe(take(1),map((userObject)=>
      {
        const isAuth = !!userObject;
        if(isAuth) {
          if(url.includes('/auth'))
          {
            return this.router.createUrlTree(['/browse']);
          }
          else if(url.includes('/movieDetails'))
          {
            if (this.movieService.getMovieDetails())
            {
              return true;
            }
            else {
              return this.router.createUrlTree(['/browse']);
            }
          }
          return true;  
        }
        else {
          if(url.includes('/auth'))
          {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
      }))
      

  }
  
}
