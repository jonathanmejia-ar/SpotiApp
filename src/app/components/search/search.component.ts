import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {

  }


  buscar(termino: string) {
    this.loading = true;

    this.spotify.searchArtist(termino)
      .subscribe((data: any) => {
        this.artists = data
        this.loading = false;
      });
  }
}
