import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss',
})
export class TrailerComponent {
  constructor(
    public movieService: MovieService,
    private activatedRooute: ActivatedRoute
  ) {
    this.movieService.getMovies();
    const imdbId = this.activatedRooute.snapshot.paramMap.get('imdbId')!;
    if (imdbId) {
      this.movieService.getMovie(imdbId);
    }
  }
}
