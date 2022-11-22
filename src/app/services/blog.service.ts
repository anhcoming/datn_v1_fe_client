import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogList(): (Observable<Object>) {
    return this.http.get(API + "blog");
  }
  getBlogListV2(body: any): (Observable<Object>) {
    return this.http.post(API + `blog/searchV2`, body);
  }

  getTopicList(): (Observable<Object>) {
    return this.http.get(API + "topic");
  }
  getBlogListByTopic(id: any) {
    return this.http.get(API + `blog/${id}`);
  }
  getBlogPostDetail(id: any) {
    return this.http.get(API + `blog/detail/${id}`);
  }
  getPostTips(): (Observable<Object>) {
    return this.http.get(API + 'blog/b4a99cb8-9acf-4487-83d6-895a73767e3c');
  }
  openTopic(id: any): (Observable<Object>) {
    return this.http.get(API + `blog/${id}`);
  }
}
