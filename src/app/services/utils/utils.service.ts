import { Injectable } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { VideoShow } from 'src/app/models/videoshow.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService,
    private posts: PostService,
    private userService: UserService,
  ) { }

  generateVideoShow(videos: Video[]) {
    
    let newVideos: VideoShow[] = [];

    videos.forEach( (v) => {
      let newVideo = new VideoShow();
      newVideo.id = v.id_post;
      newVideo.url = v.id_url;
      newVideo.id_user = v.id_user;
      newVideo.state = v.state;
      newVideo.text = v.text;


      // generate user
      this.userService.getUserById(v.id_user).subscribe({
        next: (res) =>{
          newVideo.user = new User(res);
        },
        error: (err) => (console.log(err))
      })
      
      //Recover Title Youtube
      this.spinner.show()
      setTimeout(()=> {this.spinner.hide()},3000)
      this.youTubeService.getVideoById(v.id_url).subscribe(list => {
        for (let item of list['items']) {
          newVideo.title = item.snippet.title;
        }
      });

      //Recover Number Likes
      this.posts.getNumberLikes(v.id_post).subscribe({
      next: (res) => {
        newVideo.likes = res
      },
      error: (err) => {console.log(err)}
      });

      //Recover Is Liked
      this.posts.isLiked(v.id_post).subscribe({
        next: (res) => {
          newVideo.liked = res;
        },
        error: (err) => {console.log(err)}
      });

      //Recover Comments
      this.posts.getComments(v.id_post).subscribe({
        next: (res) =>{
          newVideo.comments = res;
          newVideo.numberComments = res.length;
        }
      });

      //Recover Number Shares
      this.posts.getNumberShares(v.id_post).subscribe({
        next: (res) => {
          newVideo.shares = res
        },
        error: (err) => { console.log(err)}
      });

      //Recover Is Shared
      this.posts.isShared(v.id_post).subscribe({
        next: (res) => {
          newVideo.shared = res;
        },
        error: (err) => {console.log(err)}
      });

      
      
      //Add to video list
      if(newVideo.state !== 'deleted') {
        newVideos.push(newVideo);
      }
    })
    return newVideos;
  }
}
