import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  loading: boolean
  topTracks: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private spotify: SpotifyService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((param: any) => {
      this.getArtist(param['id']);
      this.getTopTracks(param['id']);
    });
  }

  getArtist(id: string) {
    this.spotify.getToken().subscribe(() => {
      this.spotify.getArtist(id).subscribe(data => {
        this.artist = data;
        this.loading = false;
      });
    })

  }

  getTopTracks(id: string) {
    this.spotify.getToken().subscribe(() => {
      this.spotify.getTopTracks(id).subscribe(data => {
        this.topTracks = data;
      });
    });
  }

}
