import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newSongs: any[] = [];
  loading: boolean;

  error: boolean;
  msgError: '';

  constructor(private spotify: SpotifyService) {

    this.error = false;
    this.loading = true;

    this.spotify.getNewReleases().subscribe((data: any) => {
      this.newSongs = data;
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.error = true;
      this.msgError = err.error.error.message
    });
  };

  ngOnInit(): void {

  }

}
