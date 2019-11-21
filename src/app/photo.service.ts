import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "./photo";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
private  API_URL = 'http://jsonplaceholder.typicode.com/photos'
  constructor(private http: HttpClient) { }
  getPosts(count = 10000): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.API_URL).pipe(
      map(response => response.filter((post, i) => i < count))
    );
  }
  getPostById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.API_URL}/${id}`);
  }
  createPost(post: Partial<Photo>): Observable<Photo> {
    return this.http.post<Photo>(this.API_URL, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updatePost(post: Photo): Observable<Photo> {
    return this.http.patch<Photo>(`${this.API_URL}/${post.id}`, post);
  }
}
