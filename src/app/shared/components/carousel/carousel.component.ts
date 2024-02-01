import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { videoData } from '../../models/videoData.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() carouselTitle:string='';
  @Input() movies:videoData[] = [];
  @ViewChild ('swiperContainer') swiperContainer!: ElementRef;

  constructor(private router:Router, private movieService:MovieService) { }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnInit(): void {
  }

  private initSwiper()
  {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: false,
      spaceBetween: 15,
      loop: false,
      breakpoints: {

        300: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          centeredSlides: false,
          spaceBetween: 8,
          loop: false
        },
        600: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: false,
          loop: false
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: false,
          loop: false
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 10,
          centeredSlides: false,
          loop:false
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 10,
          centeredSlides: false,
          loop: false
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 10,
          centeredSlides: false,
          loop: false
        }
      }
    })
  }

  getCharacterLimit(movie: any): number {
    if (movie && (movie.original_title || movie.original_name)) {
      return (movie.original_title?.length > 18 || movie.original_name?.length > 18) ? 80 : 120;
    }
    return 115; // Default character limit if movie or its properties are null or undefined
  }

  navigateToMovieDetails(movie: any) {
    console.log('In carousel', movie)
    this.movieService.setMovieDetails(movie);
    // this.router.navigate(['/movieDetails'], { state: { movieData: movie } });
    this.router.navigate(['./movieDetails']);
  } 

}
