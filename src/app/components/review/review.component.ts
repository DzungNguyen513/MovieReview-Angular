import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { HttpService, PostReview } from '../../services/http.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  review = new FormControl('', Validators.required);
  constructor(
    public movieService: MovieService,
    private activatedRooute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.movieService.getMovies();
    const imdbId = this.activatedRooute.snapshot.paramMap.get('imdbId');
    if (imdbId) {
      this.movieService.getMovie(imdbId);
    }
  }

  onSubmitReview() {
    if (this.review.invalid) {
      return;
    }
    const review: PostReview = {
      imdbId: this.movieService.selectedMovie()?.imdbId!,
      reviewBody: this.review.value!,
    };
    this.httpService
      .postReviews(review)
      .pipe(
        switchMap(() => {
          return this.httpService.getMovies();
        })
      )
      .subscribe((movies) => {
        this.movieService.movies.set(movies);
      });
  }
}
