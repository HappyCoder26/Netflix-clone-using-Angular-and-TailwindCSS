import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails:any;

  constructor(private route:Router, private movieService:MovieService) {
    // let movieData = this.route.getCurrentNavigation()?.extras.state?.['movieData'];
    // if(!movieData)
    // {
    //   this.movieDetails = this.movieService.getMovieDetails();
    // }
    // else
    // {
    //   this.movieService.setMovieDetails(movieData);
    // }
   }

  ngOnInit(): void {
    this.movieDetails = this.movieService.getMovieDetails();
  }

  ngOnDestroy(): void {
    this.movieService.removeMovieDetails();
  }

}
