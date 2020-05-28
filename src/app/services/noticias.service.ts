import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(){
    return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9958687c32b94893844ede5d23a755b4`);
  }
}
