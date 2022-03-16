import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Player from "@vimeo/player";

@Component({
  selector: 'app-coures-video-list',
  templateUrl: './coures-video-list.component.html',
  styleUrls: ['./coures-video-list.component.scss']
})
export class CouresVideoListComponent implements OnInit {


  constructor(private authService: AuthService, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    this.fatchCourseVideos();
    this.initPlayer();
  }

  videoList: any;
  error: boolean = false;
  courseId: any;

  fatchCourseVideos() {
    let url = this.router.url;
    let courseId = url.replace('/course/', '');
    this.authService.fatchCourseVideos(courseId).subscribe((video: any) => {
      this.videoList = video.videos;
      this.courseId = video.videos.course_id;
      if(video.videos.length == 0){
        this.error = true;
      }
    })
  }

  parseVimeo() {
    return this.sanitizer.bypassSecurityTrustUrl(this.videoList[0].url);
  }

  private player: any;

  private initPlayer(){
    this.player = new Player('intro', {});
    this.player.setVolume(0);
    this.player.on('play', function() {
        console.log('played the video!');
    });
  }
}
