import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interface';
import { environment } from '../../environments/environment';
const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl; // primera parte de la url
const headers = new HttpHeaders({
  'X-Api-key': apiKey
}); // ultima parte de la url apiKey= ****

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
// <T> Especifica el tipo de dato
  private ejecutarQuery<T>( query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }
  constructor(private http: HttpClient) { }

  getTopHeadLines(){
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=co&apiKey=9958687c32b94893844ede5d23a755b4`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=co`);
  }
  getCategories(cat: string){
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=co&category=business&apiKey=9958687c32b94893844ede5d23a755b4`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=co&category=${cat}`);
  }
}
