import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coures-video-list',
  templateUrl: './coures-video-list.component.html',
  styleUrls: ['./coures-video-list.component.scss']
})
export class CouresVideoListComponent implements OnInit {


  constructor(private authService: AuthService, private sanitizer: DomSanitizer, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.fatchCourseVideos();
  }
  
  videoList: any;
  fatchCourseVideos() {
    let url  = this.router.url;
    let courseId  = url.replace('/user/', '');
    this.authService.fatchCourseVideos(courseId).subscribe((video: any) => {
      this.videoList = video.videos;
    })
  }

  parseVimeo(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
