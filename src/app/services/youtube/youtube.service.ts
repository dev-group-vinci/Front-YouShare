import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyDtrshonP3RgH80zzKkSDgzd5nzgSkJhGg';

  constructor(public http: HttpClient) { }

    getVideosForChanel(channel, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
    }

    getVideoTheme(ideaSend: any): Observable<Object> {
      var idea = ideaSend.entry;
      let url='https://youtube.googleapis.com/youtube/v3/search?part=snippet&key= ' + this.apiKey + '&type=video&q=' + idea
      return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
    }

    getVideoById(id): Observable<Object> {
      let url='https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + this.apiKey
      return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
    }

    //let url='https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDtrshonP3RgH80zzKkSDgzd5nzgSkJhGg&id=sNMtjs_wQiE
    //let url='https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDtrshonP3RgH80zzKkSDgzd5nzgSkJhGg&type=video&q=ajax' 
}