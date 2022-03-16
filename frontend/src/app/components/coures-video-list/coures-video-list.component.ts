import { Component, Input, OnInit, Pipe } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import Player from "@vimeo/player";

@Component({
  selector: 'app-coures-video-list',
  templateUrl: './coures-video-list.component.html',
  styleUrls: ['./coures-video-list.component.scss']
})
export class CouresVideoListComponent implements OnInit {

  _sanitizer: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.fatchCourseVideos();
  }

  videoList: any;
  error: boolean = false;

  fatchCourseVideos() {
    let url = this.router.url;
    let courseId = url.replace('/course/', '');
    this.authService.fatchCourseVideos(courseId).subscribe((video: any) => {
      this.videoList = video.videos;
      this.initPlayer();
      if (video.videos.length == 0) {
        this.error = true;
      }
    })
  }

  private player: any;

  private initPlayer() {
    if (this.videoList != undefined) {
      setTimeout(() => {
        for (let i = 0; i < this.videoList.length; i++) {
          let n = i.toString();
          let element = document.getElementById(n) as HTMLElement;
          this.player = new Player(element);
          this.player.setVolume(0);
          this.player.on('play', function () {
            console.log('played the video!');
          });
        }
      }, 3000);
    }
  }
}
